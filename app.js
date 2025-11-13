/**
 * OllaCon App JavaScript
 * 1. 핀 번호 유효성 검사 및 버튼 상태 제어 (exchange_pin.html)
 * 2. 마켓 페이지 캐러셀 (이미지 슬라이드) 자동 전환 기능 (market.html)
 * 3. 스크롤 등장 애니메이션 (index.html)
 * 4. 알림 설정 토글 스위치 기능 (mypage.html)
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. 핀 번호 유효성 검사 (exchange_pin.html) ---
    const pinInput = document.getElementById('pin-input');
    const checkButton = document.getElementById('check-pin-button');

    if (pinInput && checkButton) {
        checkButton.classList.add('disabled');
        checkButton.disabled = true;

        pinInput.addEventListener('input', () => {
            const pinValue = pinInput.value.trim();
            const isValid = /^\d{10}$/.test(pinValue); 

            if (isValid) {
                checkButton.classList.remove('disabled');
                checkButton.disabled = false;
                checkButton.textContent = '핀 번호 유효성 확인';
            } else {
                checkButton.classList.add('disabled');
                checkButton.disabled = true;
                
                if (pinValue.length > 0 && pinValue.length < 10) {
                     checkButton.textContent = `10자리 숫자를 입력하세요 (${pinValue.length}/10)`;
                } else if (pinValue.length > 10) {
                     checkButton.textContent = '자리수가 초과되었습니다';
                } else {
                     checkButton.textContent = '핀 번호를 입력하세요';
                }
            }
        });
        
        checkButton.addEventListener('click', () => {
             if (!checkButton.disabled) {
                 alert(`입력하신 핀 번호 (${pinInput.value})의 교환 가능 여부를 서버에 요청합니다.`);
                 
                 const guideElement = document.querySelector('.exchange-guide h2');
                 if (guideElement) {
                     guideElement.textContent = "✅ 핀 번호 확인 완료!";
                 }
                 alert('✅ 유효한 쿠폰입니다. 올라콘 5,000원에 교환 가능!');
             }
        });
    }
    
    // --- 2. 캐러셀 자동 전환 기능 (market.html) ---
    const carousel = document.getElementById('market-carousel');
    const indicatorsContainer = document.getElementById('carousel-indicators');
    
    if (carousel && indicatorsContainer) {
        const items = carousel.querySelectorAll('.carousel-item');
        const dots = indicatorsContainer.querySelectorAll('.dot');
        const totalItems = items.length;
        let currentIndex = 0;
        
        const getScrollDistance = () => {
             const containerWidth = carousel.parentElement.clientWidth;
             return containerWidth * 0.9 + 10;
        };
        
        const updateCarousel = () => {
            const distance = getScrollDistance();
            carousel.style.transform = `translateX(-${currentIndex * distance}px)`;

            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        };
        
        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        };

        updateCarousel(); 

        let slideInterval = setInterval(nextSlide, 3000);
        
        carousel.addEventListener('scroll', () => {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 3000);
        });
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
                
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, 3000);
            });
        });
        
    }

    // --- 3. 스크롤 등장 애니메이션 (index.html) ---
    const revealElements = document.querySelectorAll('.reveal-item');
    const windowHeight = window.innerHeight;

    const checkReveal = () => {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            
            if (elementTop < windowHeight * 0.8) {
                el.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', checkReveal);
    window.addEventListener('load', checkReveal);

    // --- 4. 알림 설정 토글 스위치 기능 (mypage.html) ---
    const notificationToggle = document.getElementById('notification-toggle');

    if (notificationToggle) {
        const STORAGE_KEY = 'ollacon_notifications_enabled';
        
        // 1. 초기 로드 시 상태 적용 (브라우저 저장소 사용)
        const savedState = localStorage.getItem(STORAGE_KEY);
        if (savedState !== null) {
            notificationToggle.checked = (savedState === 'true');
        } else {
            // 저장된 상태가 없으면 기본값 (checked=true)으로 저장
            localStorage.setItem(STORAGE_KEY, notificationToggle.checked);
        }

        // 2. 토글 클릭 시 상태 저장 및 피드백 제공
        notificationToggle.addEventListener('change', () => {
            const isEnabled = notificationToggle.checked;
            localStorage.setItem(STORAGE_KEY, isEnabled);
            
            if (isEnabled) {
                console.log('알림 설정: 활성화되었습니다.');
            } else {
                console.log('알림 설정: 비활성화되었습니다.');
            }
        });
    }

});