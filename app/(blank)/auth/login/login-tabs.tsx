"use client";
import { useState } from "react";

import toast from "react-hot-toast";
import { Icon } from "@iconify/react";

import {
	Avatar,
	Button,
	Checkbox,
	Input,
	Listbox,
	ListboxItem,
	Tab,
	Tabs,
	Tooltip
} from "@nextui-org/react";

import { Col, Link, ListBoxWrapper, PasswordInput, Row } from "@/components/common";
import { useEmailCaptchaCountdown, useAuthForm } from "~/hooks/business";
import { useAuthStateInComponent, useAuthAction } from "~/store/modules/auth";
import ImageCaptcha from "./image-captcha";

export default function LoginTabs() {
	const {
		// isLoading,
		// setIsLoading,
		rememberMe,
		setRememberMe,
		verificationFailed,
		setVerificationFailed,
		email,
		setEmail,
		isInvalidEmail,
		username,
		setUsername,
		isInvalidUsername,
		password,
		setPassword,
		isInvalidPassword,
		captcha,
		setCaptcha,
		isInvalidCaptcha,
		emailCaptcha,
		setEmailCaptcha,
		isInvalidEmailCaptcha
	} = useAuthForm();

	const { count, startCountdown, resetCountdown, CountdownText } = useEmailCaptchaCountdown(120);

	const generateTraceId = () => `${Math.random().toString(36).slice(-8)}${Date.now()}`;
	const [traceId, setTraceId] = useState(generateTraceId());
	const captchaURL = `${process.env.SERVER_URL}/auth/image_captcha/?traceId=${traceId}`;

	const handleCountdownButtonClick = () => {
		if (!email) {
			toast.error("邮箱不能为空");
			return;
		}

		if (isInvalidEmail) {
			setVerificationFailed(true);
			return;
		}

		if (count === 0) {
			resetCountdown();
		}

		startCountdown();
	};

	const otherLoginList = [
		{ id: 1, icon: "/images/QQ.png", name: "QQ登录", link: "#" },
		{ id: 2, icon: "/images/微信.png", name: "微信登录", link: "#" },
		{ id: 3, icon: "/images/Github.svg", name: "Github登录", link: "#" }
	];

	const { isLoading } = useAuthStateInComponent();
	const { setIsLoading, login } = useAuthAction();
	const model: Auth.LoginForm = { username, password, captcha, traceId };

	return (
		<Tabs
			fullWidth
			size='lg'
			aria-label='login tabs form'
			onSelectionChange={() => {
				setVerificationFailed(false);
			}}
		>
			<Tab key='PasswordLogin' title='密码登录'>
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
						startContent={<Icon icon='solar:user-circle-bold-duotone' height='auto' />}
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
					/>
					<Row fullWidth items='start'>
						<Input
							isRequired
							isClearable
							label='验证码'
							type='text'
							value={captcha}
							isInvalid={verificationFailed && isInvalidCaptcha}
							color={verificationFailed && isInvalidCaptcha ? "danger" : "default"}
							errorMessage={
								verificationFailed &&
								isInvalidCaptcha &&
								"验证码应为4位长度的数字或字母"
							}
							onValueChange={setCaptcha}
							startContent={
								<Icon icon='solar:copyright-bold-duotone' height='auto' />
							}
						/>
						<Tooltip content='点击切换验证码' placement='bottom'>
							<div className='h-full border-8 border-default-100 bg-default-100 rounded-xl cursor-pointer'>
								<ImageCaptcha
									generateTraceId={generateTraceId}
									setTraceId={setTraceId}
									captchaURL={captchaURL}
								/>
							</div>
						</Tooltip>
					</Row>
					<Row justify='between' fullWidth>
						<Checkbox isSelected={rememberMe} onValueChange={setRememberMe}>
							记住我
						</Checkbox>
						<Link href='#'>忘记密码？</Link>
					</Row>
					<Col space={4} fullWidth>
						<Button
							fullWidth
							color='secondary'
							radius='full'
							onPress={() => {
								// 如果输入为空，弹出提示
								if (!username || !password || !captcha) {
									toast.error("请输入完整信息");
									return;
								}

								// 如果有错误，开启表单错误显示
								if (isInvalidUsername || isInvalidPassword || isInvalidCaptcha) {
									setVerificationFailed(true);
									return;
								}

								setVerificationFailed(false);
								login(model);
							}}
							isLoading={isLoading}
						>
							登录
						</Button>
						<p>
							没有账户？{"  "}
							<Link href='/auth/register'>注册</Link>
						</p>
					</Col>
				</Col>
			</Tab>
			<Tab key='EmailLogin' title='邮箱登录'>
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
					<Row fullWidth items='start'>
						<Input
							isRequired
							isClearable
							label='验证码'
							type='text'
							value={emailCaptcha}
							isInvalid={verificationFailed && isInvalidEmailCaptcha}
							color={
								verificationFailed && isInvalidEmailCaptcha ? "danger" : "default"
							}
							errorMessage={
								verificationFailed && isInvalidEmailCaptcha && "验证码应是6位的数字"
							}
							onValueChange={setEmailCaptcha}
							startContent={
								<Icon icon='solar:copyright-bold-duotone' height='auto' />
							}
						/>
						<div className='border-8 border-default-100 rounded-xl bg-default-100'>
							<Button variant='light' onClick={handleCountdownButtonClick}>
								<CountdownText />
							</Button>
						</div>
					</Row>
					<Button
						fullWidth
						radius='full'
						color='secondary'
						onPress={() => {
							// 如果输入为空，弹出提示
							if (!email || !emailCaptcha) {
								toast.error("请输入完整信息");
								return;
							}

							// 如果有错误，开启表单错误显示
							if (isInvalidEmail || isInvalidEmailCaptcha) {
								setVerificationFailed(true);
								return;
							}

							try {
								setIsLoading(true);
								setVerificationFailed(false);

								console.log("email:", email, "emailCaptcha: ", emailCaptcha);
							} catch {
							} finally {
								setIsLoading(false);
							}
						}}
					>
						登录
					</Button>
				</Col>
			</Tab>
			<Tab key='OtherLogin' title='第三方登录'>
				<ListBoxWrapper>
					<Listbox aria-label='OtherLogin Listbox' items={otherLoginList}>
						{(item) => (
							<ListboxItem
								key={`otherLogin ${item.id}`}
								href={item.link}
								variant='shadow'
								color='secondary'
								startContent={
									<Avatar
										src={item.icon}
										alt={item.name}
										isBordered
										color='secondary'
										className='bg-background'
									/>
								}
								textValue={item.name}
							>
								<Row justify='center' className='text-lg font-bold'>
									{item.name}
								</Row>
							</ListboxItem>
						)}
					</Listbox>
				</ListBoxWrapper>
			</Tab>
		</Tabs>
	);
}
