import { faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer>
            <div className='w-full h-full px-[200px] py-20 max-xl:px-20 max-md:px-10 bg-sky-950 flex justify-between items-center max-md:flex-col'>
                <div className='w-2/4 max-md:w-full'>
                    <h1 className='font-semibold text-2xl text-white bg-sky-600 px-3 py-1 italic w-fit max-md:text-xl mb-5'>Kuotadong.id</h1>
                    <h1 className='font-bold text-5xl text-white max-xl:text-4xl'>Mau tanya?</h1>
                    <p className='text-white mt-5 max-xl:text-[14px]'>Hubungi kami melalui sosial media dibawah ini.</p>
                    <ul className='mt-10'>
                        <li className='flex items-center py-1'><FontAwesomeIcon icon={faInstagram} className='w-5 h-5 text-white mr-3' /> <Link to={"https://instagram.com/mbenedictt/"} target='_blank' className='hover:underline max-xl:text-[14px] text-white'>kuotadong.id</Link></li>
                        <li className='flex items-center py-1'><FontAwesomeIcon icon={faTwitter} className='w-5 h-5 text-white mr-3' /> <Link to="/" className='hover:underline max-xl:text-[14px] text-white'>kuotadong.id</Link></li>
                    </ul>
                </div>
                <div className="max-md:w-full max-md:mt-20">
                    <p className="font-medium text-lg text-white w-fit max-md:text-md mb-5">Bekerja sama dengan : </p>
                    <img src="/assets/img/metode.webp" alt="metode" className="w-[250px]" />
                </div>
            </div>

            <div className='w-full h-full text-white py-5 px-[200px] max-md:px-10 bg-slate-950 flex justify-between items-center max-md:flex-col-reverse'>
                <p className='font-light text-[14px] max-md:text-[12px] max-md:text-center max-md:mt-3'>© 2024 MBTheDev. All rights reserved</p>
                <div className='flex gap-5'>
                    <Link to="/" className="hover:underline border-r border-white pr-4 text-[14px] max-md:text-[12px]">Syarat & Ketentuan</Link>
                    <Link to="/" className="hover:underline border-white text-[14px] max-md:text-[12px]">Kebijakan Privasi</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer;