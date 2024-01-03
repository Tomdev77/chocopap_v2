import React from 'react';

export default function GoogleMap() {
  return (
    <iframe 
      title="Google Maps" 
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83998.7782458406!2d2.2646350042914767!3d48.858938434551284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis!5e0!3m2!1sfr!2sfr!4v1704231093322!5m2!1sfr!2sfr"
      width="350" 
      height="350" 
      style={{ border: 0 }} 
      allowFullScreen="" 
      loading="lazy" 
      referrerPolicy="no-referrer-when-downgrade">
    </iframe>
  );
}