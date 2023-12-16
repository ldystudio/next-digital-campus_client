const About: AuthRoute.Route = {
    name: "about",
    path: "/about",
    component: "self",
    meta: {
        title: "关于",
        singleLayout: "basic",
        permissions: ["admin", "teacher", "student"],
        icon: "solar:ghost-bold-duotone",
        order: 999
    }
}

export default About
