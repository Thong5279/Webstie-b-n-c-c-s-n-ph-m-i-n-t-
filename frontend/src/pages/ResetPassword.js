import { Link } from "react-router-dom";


const ResetPassword = () => {

  return (
    <section className="my-[200px]">
      <div className='container mx-auto p-4'>
        <div className='bg-white p-5 w-full max-w-sm mx-auto rounded-md'>
          <h2 className='text-center text-2xl mb-4'>Đặt lại mật khẩu</h2>
          <input
            type='password'
            placeholder='Nhập mật khẩu mới'
            className='w-full bg-slate-100 p-2 outline-none'
          />
          <input
            type='password'
            placeholder='Nhập lại mật khẩu mới'
            className='w-full bg-slate-100 p-2 outline-none mt-5'
          />
          <div className="flex gap-3">
                <button
                className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full rounded-full hover:scale-110 transition-all block mt-6'
            >
                <Link to={'/forgot-password'}>
                    Quay lại
                </Link>
            </button>
            <button
                className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full rounded-full hover:scale-110 transition-all block mt-6'
            >
                Đặt lại mật khẩu
            </button>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
