import { Link } from "react-router-dom"


const ForgotPassword = () => {
  

  return (
    <div className="flex justify-center items-center my-[200px] bg-gray-100">
            <form className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Quên Mật Khẩu</h2>
                
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email:</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Nhập email của bạn"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                />
                  <Link to={'/login'}>
                    <p className="text-right mt-2 hover:text-red-500 hover:underline">Bạn đã có tài khoản ?</p>
                  </Link>
                <button
                    type="submit"
                    className="mt-4 w-full py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-all duration-200"
                >
                    Tiếp theo
                </button>
            </form>
        </div>
  )
}

export default ForgotPassword