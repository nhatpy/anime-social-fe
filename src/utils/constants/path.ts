export const path = {
    home: "/",

    //for footer
    about: "/about",
    contact: "/contact",
    policy: "/policy",
    terms: "/terms",

    //for auth
    login: "/login",
    register: "/register",
    verify_success: "/verify-success",
    verify_email: "/verify-email",
    reset_password: "/reset-password",

    //for list manga
    follow: "/follow",
    history: "/history",
    search: "/search",

    //for dashboard
        //both user and admin
    dashboard_info: "/dashboard",
    dashboard_change_password: "/dashboard/change-password",

        //only user
    dashboard_gem: "/dashboard/gem",
    dashboard_manga: "/dashboard/manga",

        //only admin
    dashboard_chart: "/dashboard/chart",
    dashboard_manage_user: "/dashboard/manage-user",
    dashboard_manage_manga: "/dashboard/manage-manga",
    dashboard_category: "/dashboard/category",

    //for manga detail
    manga_detail: "/manga/:manga-name",
    chapter_detail: "/manga/:manga-name/:chapter-number",

    //for create manga
    create_manga: "/manga/create-manga",
    manga_create_detail: "/manga/create-manga/:manga-name",
    create_chapter: "/manga/create-manga/:manga-name/create-chapter",
}