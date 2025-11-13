// 페이지별 스크립트 (market.html 등에서 사용되는 스크립트)

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. 카테고리 선택 및 활성화 로직
    const categoryScroll = document.querySelector('.category-scroll');
    
    if (categoryScroll) {
        categoryScroll.addEventListener('click', (e) => {
            const categoryItem = e.target.closest('.category-item');
            if (categoryItem) {
                // 기존 활성화 클래스 제거
                const allItems = document.querySelectorAll('.category-item');
                allItems.forEach(item => item.classList.remove('active'));
                
                // 클릭된 아이템에 활성화 클래스 추가
                categoryItem.classList.add('active');

                const selectedCategory = categoryItem.textContent;
                console.log(`${selectedCategory} 카테고리 선택됨. 상품 필터링 시작.`);
            }
        });
    }

    // 2. 상품 클릭 시 이벤트
    const productGrid = document.querySelector('.product-grid');
    if (productGrid) {
        productGrid.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            if (productCard) {
                const productName = productCard.querySelector('.product-name').textContent;
                // 실제 교환 로직 대신 임시 알림
                alert(`${productName} 교환을 위해 상세 페이지로 이동합니다.`); 
            }
        });
    }
    
    // 3. 뒤로 가기 버튼 이벤트
    const backButton = document.querySelector('.exchange-header .fa-arrow-left');
    if (backButton) {
        backButton.addEventListener('click', () => {
            history.back(); // 브라우저 이전 페이지로 이동
        });
    }

    console.log('Script.js 로드 완료');
});