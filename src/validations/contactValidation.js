import * as yup from "yup"

export const contactSchema = yup.object().shape({
    fullname: yup.string().required("نام و نام خانوادگی الزامی می باشد"),
    photo: yup.string().url("آدرس معتبر نیست"),
    mobile: yup.string().required("شماره موبایل الزامی می باشد"),
    email: yup.string().email("آدرس ایمیل معتبر نیست").required("ایمیل الزامی می باشد"),
    job: yup.string().nullable(),
    group: yup.string().required("گروه الزامی می باشد")
})