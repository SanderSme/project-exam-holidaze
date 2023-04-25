import { useFormik } from "formik"
import * as Yup from 'yup'

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
            fetch('https://nf-api.onrender.com/api/v1/holidaze/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            .then(response => {
                if(!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json()
            })
            .then(data => {
                console.log(data);
                localStorage.setItem("userName", data.name);
                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("avatar", data.avatar);
                window.location.href = '/';
            })
            .catch(error => {
                console.error(error)
            })
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
                        {formik.touched.email && formik.errors.email ? <div className='text-red-600'>{formik.errors.email}</div> : null}
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
                        {formik.touched.password && formik.errors.password ? <div className='text-red-600'>{formik.errors.password}</div> : null}

            </div>
            <button type="submit" className="bg-[#FFC107] w-1/3 py-1 rounded shadow place-self-end">Sing in</button>
        </form>
    </>
  )
}

export default LoginForm