import { useFormik } from "formik"
import * as Yup from 'yup'
import { Link } from "react-router-dom"
import { registerUser, logIn } from "../store/modules/profileSlice"

const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "Must be 3 chars or more").max(50, "Can not be longer than 50 chars").matches(/^\S*$/, 'No spaces allowed in name').required('Required'),
    email: Yup.string().required('Required').email('Invalid email').matches(/@stud\.noroff\.no$/, 'Must be a stud.noroff.no email address'),
    password: Yup.string().min(8, "Must be 8 chars or more").max(50, "Can not be longer than 50 chars").required('Required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
    avatar: Yup.string()
    .url('Invalid URL')
    .matches(/\.(gif|jpe?g|png)$/i, 'Invalid image URL')
})

const RegisterForm = () => {
    const formik = useFormik({
        initialValues:{
            name: "",
            email: "",
            avatar: "",
            password: "",
            confirmPassword: "",
            venueManager: "no"
        },
        validationSchema,
        onSubmit: (values) => {
            const userData = {
                name: values.name,
                email: values.email.toLowerCase(),
                avatar: values.avatar,
                venueManager: values.venueManager === "yes",
                password: values.password
            };
            const logInData = {
                email: values.email.toLowerCase(),
                password: values.password
            }
            registerUser(userData, logInData)
        }
    })
  return (
    <>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <div>
                <label htmlFor="name" className="text-white">Name:</label>
                <input type="text"
                        name="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        id="name" 
                        className="w-full rounded p-1"/>
                        {formik.touched.name && formik.errors.name ? <div className='text-red-600 font-semibold'>{formik.errors.name}</div> : null}
            </div>
            <div>
                <label htmlFor="email" className="text-white">Email:</label>
                <input type="email"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        id="email" 
                        className="w-full rounded p-1"/>
                        {formik.touched.email && formik.errors.email ? <div className='text-red-600 font-semibold'>{formik.errors.email}</div> : null}
            </div>
            <div>
                <label htmlFor="avatar" className="text-white">Avatar:</label>
                <input type="text"
                        name="avatar"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.avatar}
                        id="avatar" 
                        className="w-full rounded p-1"/>
                        {formik.touched.avatar && formik.errors.avatar ? <div className='text-red-600 font-semibold'>{formik.errors.avatar}</div> : null}
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
            <div>
                <label htmlFor="confirmPassword" className="text-white">Confirm password:</label>
                <input type="password"
                        name="confirmPassword"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmPassword}
                        id="confirmPassword" 
                        className="w-full rounded p-1"/>
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? <div className='text-red-600 font-semibold'>{formik.errors.confirmPassword}</div> : null}
            </div>
            <fieldset className="text-white flex flex-col md:flex-row gap-4 md:gap-12">
                <p>Are you a venue manager?</p>
                <div>
                    <input type="radio" id="yes" name="venueManager" value="yes" checked={formik.values.venueManager === "yes"} onChange={formik.handleChange}/>
                    <label htmlFor="yes" className="ml-1">Yes</label>
                </div>
                <div>
                    <input type="radio" id="no" name="venueManager" value="no" checked={formik.values.venueManager === "no"} onChange={formik.handleChange}/>
                    <label htmlFor="no" className="ml-1">No</label>
                </div>
            </fieldset>
            <p id="errorMessage" className="text-red-600 font-semibold"></p>
            <button type="submit" className="bg-[#FFC107] w-1/2 md:w-1/3 py-1 rounded shadow place-self-end">Create profile</button>
            <Link to="/login">
                <p className="text-white underline">Already have an account?</p>
            </Link>
        </form>
    </>
  )
}

export default RegisterForm