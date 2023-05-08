import { useFormik } from "formik"
import * as Yup from 'yup'
import { Link } from "react-router-dom"
import { logIn } from "../store/modules/profileSlice"

const validationSchema = Yup.object().shape({
    email: Yup.string().required('Required').email('Invalid email'),
    password: Yup.string().min(6, "Must be 6 chars or more").max(50, "Can not be longer than 50 chars").required('Required')
})

const LoginForm = () => {
    const formik = useFormik({
        initialValues:{
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: (values) => {
            const userData = {
                email: values.email,
                password: values.password
            };
            logIn(userData)
        }
    })
  return (
    <>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <div>
                <label htmlFor="email" className="text-white">Email:</label>
                <input type="text"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        id="email" 
                        className="w-full rounded p-1"/>
                        {formik.touched.email && formik.errors.email ? <div className='text-red-600 font-semibold'>{formik.errors.email}</div> : null}
            </div>
            <div>
                <label htmlFor="password" className="text-white">Password:</label>
                <input type="password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        id="password" 
                        className="w-full rounded p-1"/>
                        {formik.touched.password && formik.errors.password ? <div className='text-red-600 font-semibold'>{formik.errors.password}</div> : null}

            </div>
            <p id="errorMessage" className="text-red-600 font-semibold"></p>
            <button type="submit" className="bg-[#FFC107] w-1/3 py-1 rounded shadow place-self-end">Sing in</button>
            <Link to="/register">
                <p className="text-white underline">Dont have an account?</p>
            </Link>
        </form>
    </>
  )
}

export default LoginForm