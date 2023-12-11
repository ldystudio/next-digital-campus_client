export const siteConfig = {
    name: "Next数字校园",
    description: "Make beautiful websites regardless of your design experience.",
    navItems: [
        {
            label: "首页",
            href: "/index"
        },
        {
            label: "管理",
            href: "/dashboard/analysis"
        },
        {
            label: "关于",
            href: "/about"
        },
        {
            label: "博客",
            href: "/blog"
        },
        {
            label: "价格",
            href: "/pricing"
        },
        {
            label: "文章",
            href: "/docs"
        },
        {
            label: "测试",
            href: "/test"
        }
    ],
    navMenuItems: [
        {
            label: "Profile",
            href: "/profile"
        },
        {
            label: "Dashboard",
            href: "/dashboard"
        },
        {
            label: "Projects",
            href: "/projects"
        },
        {
            label: "Team",
            href: "/team"
        },
        {
            label: "Calendar",
            href: "/calendar"
        },
        {
            label: "Settings",
            href: "/settings"
        },
        {
            label: "Help & Feedback",
            href: "/help-feedback"
        },
        {
            label: "Logout",
            href: "/logout"
        }
    ],
    sideMenuItems: [
        {
            name: "dashboard",
            path: "/dashboard",
            meta: {
                title: "仪表盘",
                permissions: ["admin", "teacher", "student"],
                icon: "solar:chart-square-bold-duotone",
                order: 10
            },
            children: [
                {
                    name: "dashboard_analysis",
                    path: "/dashboard/analysis",
                    meta: {
                        title: "分析页",
                        icon: "solar:graph-new-bold-duotone",
                        order: 11
                    }
                },
                {
                    name: "dashboard_workbench",
                    path: "/dashboard/workbench",
                    meta: {
                        title: "工作台",
                        icon: "solar:calendar-bold-duotone",
                        order: 12
                    }
                }
            ]
        },
        {
            name: "management_student",
            path: "/management_student",
            meta: {
                title: "学生管理",
                icon: "solar:users-group-two-rounded-bold-duotone",
                order: 20
            },
            children: [
                {
                    name: "management_student_information",
                    path: "/management_student/information",
                    meta: {
                        title: "信息管理",
                        icon: "solar:user-id-bold-duotone",
                        order: 21
                    }
                },
                {
                    name: "management_student_roll",
                    path: "/management_student/roll",
                    meta: {
                        title: "学籍管理",
                        icon: "solar:clapperboard-text-bold-duotone",
                        order: 22
                    }
                },
                {
                    name: "management_student_attendance",
                    path: "/management_student/attendance",
                    meta: {
                        title: "考勤管理",
                        icon: "solar:clipboard-list-bold-duotone",
                        order: 23
                    }
                }
            ]
        },
        {
            name: "management_teacher",
            path: "/management_teacher",
            meta: {
                title: "教师管理",
                icon: "solar:users-group-rounded-bold",
                order: 30
            },
            children: [
                {
                    name: "management_teacher_information",
                    path: "/management_teacher/information",
                    meta: {
                        title: "信息管理",
                        icon: "solar:user-id-bold-duotone",
                        order: 31
                    }
                },
                {
                    name: "management_teacher_work",
                    path: "/management_teacher/work",
                    meta: {
                        title: "工作安排",
                        icon: "solar:checklist-minimalistic-bold-duotone",
                        order: 32
                    }
                },
                {
                    name: "management_teacher_attendance",
                    path: "/management_teacher/attendance",
                    meta: {
                        title: "考勤管理",
                        icon: "solar:clipboard-list-bold-duotone",
                        order: 33
                    }
                }
            ]
        },
        {
            name: "management_course",
            path: "/management_course",
            meta: {
                title: "课程管理",
                icon: "solar:book-2-bold-duotone",
                order: 40
            },
            children: [
                {
                    name: "management_course_setting",
                    path: "/management_course/setting",
                    meta: {
                        title: "课程设置",
                        icon: "solar:diploma-verified-bold-duotone",
                        order: 41
                    }
                },
                {
                    name: "management_course_table",
                    path: "/management_course/table",
                    meta: {
                        title: "课程表管理",
                        icon: "solar:document-bold-duotone",
                        order: 42
                    }
                },
                {
                    name: "management_course_choose",
                    path: "/management_course/choose",
                    meta: {
                        title: "选课管理",
                        icon: "solar:bookmark-square-bold-duotone",
                        order: 43
                    }
                }
            ]
        },
        {
            name: "management_score",
            path: "/management_score",
            meta: {
                title: "成绩管理",
                icon: "solar:documents-bold-duotone",
                order: 50
            },
            children: [
                {
                    name: "management_score_enter",
                    path: "/management_score/enter",
                    meta: {
                        title: "成绩录入",
                        icon: "solar:document-medicine-bold-duotone",
                        order: 51
                    }
                },
                {
                    name: "management_score_statistics",
                    path: "/management_score/statistics",
                    meta: {
                        title: "成绩统计",
                        icon: "solar:pie-chart-2-bold-duotone",
                        order: 52
                    }
                },
                {
                    name: "management_score_query",
                    path: "/management_score/query",
                    meta: {
                        title: "成绩查询",
                        icon: "solar:minimalistic-magnifer-bold-duotone",
                        order: 53
                    }
                }
            ]
        },
        {
            name: "management_exam",
            path: "/management_exam",
            meta: {
                title: "考试管理",
                icon: "solar:document-text-bold-duotone",
                order: 60
            },
            children: [
                {
                    name: "management_exam_enter",
                    path: "/management_exam/enter",
                    meta: {
                        title: "考试安排",
                        icon: "solar:document-medicine-bold-duotone",
                        order: 61
                    }
                },
                {
                    name: "management_exam_score",
                    path: "/management_exam/score",
                    meta: {
                        title: "考试成绩管理",
                        icon: "solar:explicit-bold-duotone",
                        order: 62
                    }
                },
                {
                    name: "management_exam_query",
                    path: "/management_exam/query",
                    meta: {
                        title: "考试查询",
                        icon: "solar:minimalistic-magnifer-bold-duotone",
                        order: 63
                    }
                }
            ]
        },
        {
            name: "management_task",
            path: "/management_task",
            meta: {
                title: "作业管理",
                icon: "solar:notebook-bold-duotone",
                order: 70
            },
            children: [
                {
                    name: "management_task_add",
                    path: "/management_task/add",
                    meta: {
                        title: "作业布置",
                        icon: "solar:notebook-bookmark-bold-duotone",
                        order: 71
                    }
                },
                {
                    name: "management_task_send",
                    path: "/management_task/send",
                    meta: {
                        title: "作业提交",
                        icon: "solar:file-send-bold-duotone",
                        order: 72
                    }
                },
                {
                    name: "management_task_correct",
                    path: "/management_task/correct",
                    meta: {
                        title: "作业批改",
                        icon: "solar:gallery-edit-bold-duotone",
                        order: 73
                    }
                }
            ]
        },
        {
            name: "management_resource",
            path: "/management_resource",
            meta: {
                title: "资源管理",
                icon: "solar:server-square-cloud-bold-duotone",
                order: 80
            },
            children: [
                {
                    name: "management_resource_upload",
                    path: "/management_resource/upload",
                    meta: {
                        title: "教学资源上传",
                        icon: "solar:upload-square-bold",
                        order: 81
                    }
                },
                {
                    name: "management_resource_share",
                    path: "/management_resource/share",
                    meta: {
                        title: "共享资源管理",
                        icon: "solar:share-circle-bold-duotone",
                        order: 82
                    }
                },
                {
                    name: "management_resource_online",
                    path: "/management_resource/online",
                    meta: {
                        title: "在线文档管理",
                        icon: "solar:cloud-file-bold-duotone",
                        order: 83
                    }
                }
            ]
        },
        {
            name: "management_activity",
            path: "/management_activity",
            meta: {
                title: "活动管理",
                icon: "solar:stars-bold-duotone",
                order: 90
            },
            children: [
                {
                    name: "management_activity_release",
                    path: "/management_activity/release",
                    meta: {
                        title: "活动发布",
                        icon: "solar:stars-line-bold-duotone",
                        order: 91
                    }
                },
                {
                    name: "management_activity_enroll",
                    path: "/management_activity/enroll",
                    meta: {
                        title: "活动报名",
                        icon: "solar:stars-minimalistic-bold-duotone",
                        order: 92
                    }
                },
                {
                    name: "management_activity_achievement",
                    path: "/management_activity/achievement",
                    meta: {
                        title: "活动成果展示",
                        icon: "solar:atom-bold-duotone",
                        order: 93
                    }
                }
            ]
        },
        {
            name: "management_class",
            path: "/management_class",
            meta: {
                title: "班级管理",
                icon: "solar:buildings-2-bold-duotone",
                order: 100
            },
            children: [
                {
                    name: "management_class_member",
                    path: "/management_class/member",
                    meta: {
                        title: "班级成员管理",
                        icon: "solar:user-bold",
                        order: 101
                    }
                },
                {
                    name: "management_class_forum",
                    path: "/management_class/forum",
                    meta: {
                        title: "班级论坛",
                        icon: "solar:subtitles-bold-duotone",
                        order: 102
                    }
                },
                {
                    name: "management_class_photo",
                    path: "/management_class/photo",
                    meta: {
                        title: "班级相册",
                        icon: "solar:gallery-bold-duotone",
                        order: 103
                    }
                }
            ]
        },
        {
            name: "learning",
            path: "/learning",
            meta: {
                title: "在线学习",
                icon: "solar:colour-tuneing-bold-duotone",
                order: 110
            },
            children: [
                {
                    name: "learning_classroom",
                    path: "/learning/classroom",
                    meta: {
                        title: "在线课堂",
                        icon: "solar:presentation-graph-bold-duotone",
                        order: 111
                    }
                },
                {
                    name: "learning_share",
                    path: "/learning/share",
                    meta: {
                        title: "学习资源分享",
                        icon: "solar:share-bold-duotone",
                        order: 112
                    }
                },
                {
                    name: "learning_discuss",
                    path: "/learning/discuss",
                    meta: {
                        title: "在线讨论",
                        icon: "solar:user-speak-bold-duotone",
                        order: 113
                    }
                }
            ]
        },
        {
            name: "notice",
            path: "/notice",
            meta: {
                title: "通知通告",
                icon: "solar:chat-line-bold-duotone",
                order: 200
            },
            children: [
                {
                    name: "notice_school",
                    path: "/notice/school",
                    meta: {
                        title: "学校通知",
                        icon: "solar:letter-opened-bold-duotone",
                        order: 201
                    }
                },
                {
                    name: "notice_class",
                    path: "/notice/class",
                    meta: {
                        title: "班级通知",
                        icon: "solar:letter-unread-bold-duotone",
                        order: 202
                    }
                },
                {
                    name: "notice_person",
                    path: "/notice/person",
                    meta: {
                        title: "个人消息通知",
                        icon: "solar:chat-square-call-bold-duotone",
                        order: 203
                    }
                }
            ]
        },
        {
            name: "setting",
            path: "/setting",
            meta: {
                title: "设置",
                icon: "solar:settings-bold-duotone",
                order: 900
            }
        },
        {
            name: "about",
            path: "/about",
            meta: {
                title: "关于",
                icon: "solar:ghost-bold-duotone",
                order: 999
            }
        }
    ],
    links: {
        github: "https://github.com/ldystudio/next-digital-campus_client",
        docs: "https://nextui-docs-v2.vercel.app",
        sponsor: "https://patreon.com/jrgarciadev"
    }
}

export type SiteConfig = typeof siteConfig
