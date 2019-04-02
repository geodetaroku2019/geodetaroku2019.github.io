$(document).ready(function(){
        //tu kod w ktorym przypisane sa zmienne z adresami do udostepnianych danych
    var daneOSM= L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    var daneORTO= L.tileLayer.wms('http://mapy.geoportal.gov.pl/wss/service/img/guest/ORTO/MapServer/WMSServer',
    {layer:"Raster", format:"image/png", transparent: 'true', version:'1.1.1' });
    //tutaj jest przypisywanie zmiennej obiektu "L" i wywolanie metody map ktora tworzy mape o wybranych parametrach
    var mojaMapa=L.map('mapa',{center:[52.1, 21.0], zoom:10} );
    
    //wywołanie mapy i wprowadzanie do niej danych z OSM
    mojaMapa.addLayer(daneOSM);
        
    //obsluga roznych zrodel danych
        var baseMaps = {
            "OpenStreetMaps": daneOSM,
            "Ortofotomapa": daneORTO,
            
        };
    //dodanie guzika do przelaczania danych miedzy roznymi zrodlami
    
        L.control.layers(baseMaps).addTo(mojaMapa);
        
    //dodanie skali
    L.control.scale({imperial: false}).addTo(mojaMapa);
    
    //dodanie lokalizacji i obluga lok
    
    mojaMapa.locate({setView: true, maxZoom: 14});
    
    //funkcja ktora wyswietla ikone okregu w miejscu gdzie się znajdujemy(wspolrzedne są przesyłane za pomocą zmiennej o nazwie event)
    function zlokalizowano (event) {
        var radius = event.accuracy/2;
        L.marker(event.latlng).addTo(mojaMapa);
        L.circle(event.latlng, radius).addTo(mojaMapa);
    };
    
    mojaMapa.on('locationfound', zlokalizowano);
    
    });