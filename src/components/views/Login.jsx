import LoginForm from "../LoginForm"

const Login = () => {
  return (
    <div className="w-1/3 mx-auto h-fit bg-gradient-to-b from-[#125C85] to-[#307095] my-24 rounded py-8 px-12">
      <h1 className="text-white flex justify-center text-3xl font-semibold mb-8">Sign in</h1>
      <LoginForm/>
    </div>
  )
}

export default Login