const Resource: AuthRoute.Route = {
    name: "resource",
    path: "/resource",
    component: "basic",
    meta: {
        permissions: ["admin", "teacher", "student"],
        title: "资源管理",
        icon: "solar:server-square-cloud-bold-duotone",
        order: 80
    },
    children: [
        {
            name: "resource_upload",
            path: "/resource/upload",
            component: "self",
            meta: {
                title: "教学资源上传",
                icon: "solar:upload-square-bold",
                order: 81
            }
        },
        {
            name: "resource_share",
            path: "/resource/share",
            component: "self",
            meta: {
                title: "共享资源管理",
                icon: "solar:share-circle-bold-duotone",
                order: 82
            }
        },
        {
            name: "resource_online",
            path: "/resource/online",
            component: "self",
            meta: {
                title: "在线文档管理",
                icon: "solar:cloud-file-bold-duotone",
                order: 83
            }
        }
    ]
}

export default Resource
