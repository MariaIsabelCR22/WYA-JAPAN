# Refactorización WYA

## global.css
Mover:
- @font-face
- body
- reglas globales de a, img, * (si existen)

## header.css
Mover desde styles.css:
- .announce-track*
- @keyframes marquee
- .site-header*
- .header-main-nav*
- .logo*
- .menu-enlaces*
- .search-container*
- .user-dropdown*
- .cart-*

Copiar exactamente las reglas de styles.css y eliminarlas de prendas.css y accesorios.css.

## footer.css
Mover:
- .footer*
- .social*
- .copyright*

## home.css
Dejar únicamente:
- hero
- carousel
- banners
- secciones exclusivas del index

## prendas.css
Dejar únicamente catálogo/filtros/productos.

## accesorios.css
Dejar únicamente catálogo de accesorios.

## auth.css
Conservar login.css y renombrarlo a auth.css.

## HTML

index.html:
global.css
header.css
footer.css
home.css
responsive.css

prendas.html:
global.css
header.css
footer.css
prendas.css
responsive.css

accesorios.html:
global.css
header.css
footer.css
accesorios.css
responsive.css

login.html y register.html:
global.css
auth.css
responsive.css
