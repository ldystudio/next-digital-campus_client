"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import { Icon } from "@iconify/react"
import { Button, Image, Input, RadioGroup, Tab, Tabs } from "@nextui-org/react"
import { AnimatePresence, motion } from "framer-motion"
import NProgress from "nprogress"
import toast from "react-hot-toast"

import { CardRadio, Col, Link, PasswordInput, Row } from "@/components/common"
import { colorfulFlag } from "@/components/toys"
import { useAuthForm, useAvatarList, useEmailCaptchaCountdown } from "~/hooks/business"
import { fetchSmtpCode } from "~/service/api"
import { useAuthAction, useAuthState } from "~/store/modules/auth"
import { useRouterPush } from "~/utils/router"

type tabValue = "EmailRegister" | "FillInTheInformation" | "ChooseAnAvatar"

export default function RegisterTabs() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        NProgress.done()
    }, [pathname, searchParams])

    const tabList: tabValue[] = ["EmailRegister", "FillInTheInformation", "ChooseAnAvatar"]
    const [selectedTab, setSelectedTab] = useState<tabValue>("EmailRegister")
    const [disabledKeysList, setDisabledKeysList] = useState<tabValue[]>(
        tabList.filter((tab) => tab !== "EmailRegister")
    )

    const {
        verificationFailed,
        setVerificationFailed,
        roleType,
        setRoleType,
        email,
        setEmail,
        isInvalidEmail,
        password,
        setPassword,
        isInvalidPassword,
        emailCaptcha,
        setEmailCaptcha,
        isInvalidEmailCaptcha,
        username,
        setUsername,
        isInvalidUsername,
        confirmPassword,
        setConfirmPassword,
        isInvalidConfirmPassword
    } = useAuthForm()

    const { avatar, setAvatar, avatarList, setAvatarList, generateAvatars, avatarListKeys } =
        useAvatarList()

    const { count, startCountdown, resetCountdown, CountdownText } = useEmailCaptchaCountdown()

    const generateTraceId = () => `${Math.random().toString(36).slice(-8)}${Date.now()}`
    const [traceId, setTraceId] = useState(generateTraceId())

    async function handleCountdownButtonClick() {
        if (!email) {
            toast.error("邮箱不能为空")
            return
        }

        if (isInvalidEmail) {
            setVerificationFailed(true)
            return
        }

        if (count === 0) {
            resetCountdown()
        }

        const { error } = await fetchSmtpCode(email, traceId)
        if (error) return

        toast.success("验证码发送成功，有效期30分钟~")

        startCountdown()
    }

    function moveTab(name: tabValue) {
        setDisabledKeysList(tabList.filter((tab) => tab !== name))
        setSelectedTab(name)
    }

    const { isLoading } = useAuthState()
    const { register } = useAuthAction()
    const model: Auth.RegisterForm = {
        username,
        password,
        email,
        emailCaptcha,
        traceId,
        roleType,
        avatar
    }
    const { toRedirect } = useRouterPush()

    return (
        <>
            <Tabs
                aria-label='register tabs form'
                fullWidth
                size='lg'
                disabledKeys={disabledKeysList}
                selectedKey={selectedTab}
                onSelectionChange={(key: React.Key) => {
                    setSelectedTab(key as tabValue)
                }}
                variant='light'
            >
                <Tab key='EmailRegister' title='邮箱注册'>
                    <Col space={4}>
                        <Input
                            isRequired
                            label='邮箱'
                            type='email'
                            value={email}
                            isInvalid={verificationFailed && isInvalidEmail}
                            color={verificationFailed && isInvalidEmail ? "danger" : "default"}
                            errorMessage={verificationFailed && isInvalidEmail && "邮箱格式错误"}
                            onValueChange={setEmail}
                            startContent={<Icon icon='solar:mailbox-bold-duotone' height='auto' />}
                        />
                        <Row fullWidth>
                            <Input
                                isRequired
                                isClearable
                                label='验证码'
                                type='text'
                                value={emailCaptcha}
                                isInvalid={verificationFailed && isInvalidEmailCaptcha}
                                color={
                                    verificationFailed && isInvalidEmailCaptcha
                                        ? "danger"
                                        : "default"
                                }
                                errorMessage={
                                    verificationFailed &&
                                    isInvalidEmailCaptcha &&
                                    "验证码应是6位的数字"
                                }
                                onValueChange={setEmailCaptcha}
                                startContent={
                                    <Icon icon='solar:copyright-bold-duotone' height='auto' />
                                }
                            />
                            <div className='rounded-xl border-8 border-default-100 bg-default-100'>
                                <Button
                                    variant='light'
                                    onClick={() => handleCountdownButtonClick()}
                                    isDisabled={count !== 0 && count !== 60}
                                >
                                    <CountdownText />
                                </Button>
                            </div>
                        </Row>
                        <p className='text-default-400'>选择你的身份</p>
                        <RadioGroup
                            orientation='horizontal'
                            defaultValue='student'
                            value={roleType}
                            onValueChange={(value) => setRoleType(value as Auth.RoleType)}
                        >
                            <div className='grid grid-cols-2 gap-10'>
                                <CardRadio
                                    radioProps={{
                                        value: "student"
                                    }}
                                    name='学生'
                                >
                                    <Image
                                        src='/images/student.gif'
                                        alt='学生'
                                        className='object-cover'
                                        width={100}
                                    />
                                </CardRadio>
                                <CardRadio
                                    radioProps={{
                                        value: "teacher"
                                    }}
                                    name='教师'
                                >
                                    <Image
                                        src='/images/teacher.gif'
                                        alt='教师'
                                        className='object-cover'
                                        width={100}
                                    />
                                </CardRadio>
                            </div>
                        </RadioGroup>
                        <Button
                            fullWidth
                            radius='full'
                            color='secondary'
                            onClick={() => {
                                // 如果输入为空，弹出提示
                                if (!email || !emailCaptcha) {
                                    toast.error("请输入完整信息")
                                    return
                                }

                                // 如果有错误，开启表单错误显示
                                if (isInvalidEmail || isInvalidEmailCaptcha) {
                                    setVerificationFailed(true)
                                    return
                                }

                                setVerificationFailed(false)
                                moveTab("FillInTheInformation")
                            }}
                        >
                            下一步
                        </Button>
                        <p>
                            已有账户？{"  "}
                            <Link href='/auth/login' className='hover:cursor-pointer'>
                                登录
                            </Link>
                        </p>
                    </Col>
                </Tab>
                <Tab key='FillInTheInformation' title='填写信息'>
                    <Col space={4}>
                        <Input
                            isRequired
                            label='用户名'
                            type='text'
                            value={username}
                            isInvalid={verificationFailed && isInvalidUsername}
                            color={verificationFailed && isInvalidUsername ? "danger" : "default"}
                            errorMessage={
                                verificationFailed &&
                                isInvalidUsername &&
                                "用户名应为4~16位的字母、数字或_-"
                            }
                            onValueChange={setUsername}
                            startContent={
                                <Icon icon='solar:user-circle-bold-duotone' height='auto' />
                            }
                        />
                        <PasswordInput
                            isRequired
                            label='密码'
                            type='password'
                            value={password}
                            isInvalid={verificationFailed && isInvalidPassword}
                            color={verificationFailed && isInvalidPassword ? "danger" : "default"}
                            errorMessage={
                                verificationFailed &&
                                isInvalidPassword &&
                                "密码应为6-18位数字/字母/符号(至少包含两种)的组合"
                            }
                            onValueChange={setPassword}
                            startContent={
                                <Icon
                                    icon='solar:password-minimalistic-input-bold-duotone'
                                    height='auto'
                                />
                            }
                            endContent={
                                <Icon
                                    icon='solar:password-minimalistic-input-bold-duotone'
                                    height='auto'
                                />
                            }
                            className='appearance-none'
                        />
                        <PasswordInput
                            isRequired
                            label='确认密码'
                            type='password'
                            value={confirmPassword}
                            isInvalid={isInvalidConfirmPassword}
                            color={isInvalidConfirmPassword ? "danger" : "default"}
                            errorMessage={isInvalidConfirmPassword && "两次密码输入不一致"}
                            onValueChange={setConfirmPassword}
                            startContent={
                                <Icon icon='solar:restart-circle-bold-duotone' height='auto' />
                            }
                            className='appearance-none'
                        />
                        <Row fullWidth>
                            <Button
                                radius='full'
                                onClick={() => {
                                    moveTab("EmailRegister")
                                }}
                            >
                                上一步
                            </Button>
                            <Button
                                fullWidth
                                radius='full'
                                color='secondary'
                                onClick={() => {
                                    // 如果输入为空，弹出提示
                                    if (!username || !password || !confirmPassword) {
                                        toast.error("请输入完整信息")
                                        return
                                    }

                                    // 如果有错误，开启表单错误显示
                                    if (
                                        isInvalidUsername ||
                                        isInvalidPassword ||
                                        isInvalidConfirmPassword
                                    ) {
                                        setVerificationFailed(true)
                                        return
                                    }

                                    setVerificationFailed(false)
                                    moveTab("ChooseAnAvatar")
                                }}
                            >
                                下一步
                            </Button>
                        </Row>
                    </Col>
                </Tab>
                <Tab key='ChooseAnAvatar' title='选择头像'>
                    <Col space={4}>
                        <RadioGroup
                            orientation='horizontal'
                            value={avatar}
                            onValueChange={setAvatar}
                        >
                            <div className='grid grid-cols-3 md:grid-cols-4 md:gap-2'>
                                <AnimatePresence mode='wait'>
                                    {avatarListKeys.map((avatarKey) => (
                                        <motion.div
                                            key={avatarKey}
                                            initial={{ opacity: 0, scale: 0, skewY: 30 }}
                                            animate={{ opacity: 1, scale: 1, skewY: 0 }}
                                            exit={{ opacity: 0, scale: 0, skewY: -30 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <CardRadio
                                                radioProps={{ value: avatarKey }}
                                                cardProps={{ shadow: "sm" }}
                                            >
                                                <Image
                                                    src={avatarList.get(avatarKey)}
                                                    alt={`avatar ${avatarKey}`}
                                                    width={75}
                                                />
                                            </CardRadio>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </RadioGroup>
                        <Button
                            fullWidth
                            radius='full'
                            color='secondary'
                            variant='bordered'
                            onClick={() => {
                                setAvatarList(generateAvatars())
                            }}
                        >
                            换一批
                        </Button>
                        <Row fullWidth>
                            <Button
                                radius='full'
                                onClick={() => {
                                    moveTab("FillInTheInformation")
                                }}
                            >
                                上一步
                            </Button>
                            <Button
                                fullWidth
                                radius='full'
                                color='secondary'
                                onClick={async () => {
                                    const res = await register(model)
                                    setTraceId(generateTraceId())

                                    if (!res) {
                                        return
                                    }
                                    toast.success("注册成功")
                                    colorfulFlag()
                                    toRedirect()
                                }}
                                isLoading={isLoading}
                            >
                                注册
                            </Button>
                        </Row>
                    </Col>
                </Tab>
            </Tabs>
        </>
    )
}
