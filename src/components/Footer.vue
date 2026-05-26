<template>
  <div class="footer">
    <div class="footer-info">
      <div class="footer-logo-text">
        <div class="footer-logo">
          <img src="/images/LODOFOOTER.png" alt="7cyber" class="footer-logo-img">
        </div>
        <p>We are a residential interior design firm located in Portland. Our boutique-studio offers more than ...</p>
      </div>
      <div class="footer-nav">
        <div class="footer-col">
          <h4>Services</h4>
          <ul>
            <li>Bonus program</li>
            <li>Gift cards</li>
            <li>Credit and payment</li>
            <li>Service contracts</li>
            <li>Non-cash account</li>
            <li>Payment</li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Assistance to the buyer</h4>
          <ul>
            <li>Find an order</li>
            <li>Terms of delivery</li>
            <li>Exchange and return of goods</li>
            <li>Guarantee</li>
            <li>Frequently asked questions</li>
            <li>Terms of use of the site</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="social-icons">
      <div class="social twitter"><img src="/images/TWITER.png" alt="Twitter" class="social-icon"></div>
      <div class="social facebook"><img src="/images/FACEBOOK.png" alt="Facebook" class="social-icon"></div>
      <div class="social tiktok"><img src="/images/TIKTOK.png" alt="TikTok" class="social-icon"></div>
      <div class="social instagram"><img src="/images/INSTA.png" alt="Instagram" class="social-icon"></div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.footer {
  background: #000000;
  padding: 80px 160px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  color: #CFCFCF;
  width: 100%;
  margin-top: auto;
}

.footer-info {
  display: flex;
  justify-content: space-between;
  gap: 80px;
  flex-wrap: wrap;
}

.footer-logo-text {
  max-width: 320px;
}

.footer-logo {
  margin-bottom: 24px;
}

.footer-logo-img {
  width: auto;
  height: 32px;
  display: block;
  object-fit: contain;
}

.footer-logo-text p {
  font-size: 13px;
  line-height: 1.6;
  color: #CFCFCF;
}

.footer-nav {
  display: flex;
  gap: 60px;
  flex-wrap: wrap;
}

.footer-col h4 {
  color: #FFF;
  margin-bottom: 20px;
  font-size: 16px;
  font-family: 'Abel';
}

.footer-col ul {
  list-style: none;
}

.footer-col li {
  margin-bottom: 10px;
  font-size: 13px;
  cursor: pointer;
  transition: 0.3s;
}

.footer-col li:hover {
  color: #FFF;
}

.social-icons {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.social {
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.social-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.social:hover {
  opacity: 0.7;
}

@media (max-width: 1200px) {
  .footer {
    padding: 40px;
  }
}

@media (max-width: 768px) {
  .footer {
    padding: 40px 20px;
  }
  .footer-info {
    flex-direction: column;
    gap: 40px;
  }
  .footer-nav {
    flex-direction: column;
    gap: 30px;
  }
}
</style>