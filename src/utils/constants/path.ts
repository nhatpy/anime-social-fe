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
    email_reminder: "/email-reminder", 

    //for list manga
    follow: "/follow",
    history: "/history",
    search: "/search",

    //for dashboard
    dashboard_info: "/dashboard",
    dashboard_change_password: "/dashboard/change-password",
    dashboard_gem: "/dashboard/gem",
    dashboard_manga: "/dashboard/manga",
    payment_success: "/payment-success",

        //only admin
    admin_chart: "/admin",
    admin_manage_user: "/admin/manage-user",
    admin_manage_manga: "/admin/manage-manga",
    admin_manage_category: "/admin/manage-category",

    //for manga detail
    manga_detail: "/manga/:manga-slug",
    chapter_detail: "/manga/:manga-slug/:chapter-number",

    //for create manga
    create_manga: "/manga/create-manga",
    manga_create_detail: "/manga/create-manga/:manga-slug",
    create_chapter: "/manga/create-manga/:manga-slug/create-chapter",
    create_chapter_detail: "/manga/create-manga/:manga-slug/create-chapter/:chapter-number",
}