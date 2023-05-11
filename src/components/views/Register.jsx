import RegisterForm from "../RegisterForm"

const Register = () => {
  return (
    <div className="w-11/12 md:w-2/3 2xl:w-1/3 mx-auto h-fit bg-gradient-to-b from-[#125C85] to-[#307095] mt-44 mb-24 rounded py-8 px-4 md:px-12 ">
      <h1 className="text-white flex justify-center text-3xl font-semibold mb-8">Register</h1>
      <RegisterForm/>
    </div>
  )
}

export default Register