import './styles/main.css';
import './styles/components.css';
import './styles/home.css';
import './styles/slider.css';
import { initPopup } from './components/popup.js';
import { initSlider } from './components/slider.js';



// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initPopup();
  initSlider();
  console.log('Phoenix Wall Coatings - Application Initialized');
});

