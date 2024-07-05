
import mapboxgl from "mapbox-gl";
import { useEffect, useState } from "react";




export const MapView = () => {
    const [filter, setFilter] = useState(null); // Estado para almacenar el filtro seleccionado
    const [map, setMap] = useState(null); // Estado para almacenar la referencia al mapa
    const [residentialMarker, setResidentialMarker] = useState(null); // Estado para almacenar el marcador del residencial

    // Manejador de eventos para el clic en el filtro
    const handleFilterClick = (selectedFilter) => {
        setFilter(selectedFilter);
    };

    // Función para mostrar marcadores según el filtro seleccionado
    const showMarkersForFilter = () => {
        if (filter !== null) {
            addMarkers(placesCoordinates[filter]);
        }
    };

    // Añadir marcadores del residencial y de otros lugares
    const addMarkers = (coordinates) => {
        // Limpiar marcadores existentes
        document.querySelectorAll('.marker').forEach(marker => marker.remove());
        
        // Añadir marcadores filtrados
        coordinates.forEach((coord) => {
            new mapboxgl.Marker().setLngLat(coord).addTo(map).getElement().classList.add('marker');
        });
    };


    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1Ijoib2xpdmExMjMiLCJhIjoiY2wzdDZzMHh1MXh6ajNib2VhcHR4dWx3ZSJ9.e1SYRWtDEVsfVaId3w5tAg';
        const map = new mapboxgl.Map({
          container: 'map', // container ID
        //   style: 'mapbox://styles/oliva123/clhpfijvk03f201p87l2ae92h', // style URL
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [-101.38816638108801, 20.68052186274997], // starting position [lng, lat]
          zoom: 15, // starting zoom
          scrollZoom: false
        });

        // Guardar la referencia al mapa
        setMap(map);

        // Añadir marcador del residencial
        const residentialMarker = new mapboxgl.Marker({ color: 'red' })
            .setLngLat([-101.38816638108801, 20.68052186274997])
            .addTo(map);

        // Guardar el marcador del residencial
        setResidentialMarker(residentialMarker);

        return () => map.remove(); // Cleanup function to remove the map when the component unmounts
    }, []); // Empty dependency array ensures the effect runs only once after the initial render

    useEffect(() => {
        // Mostrar marcadores según el filtro seleccionado
        showMarkersForFilter();
    }, [filter]); // Run effect when filter changes


    // Coordenadas de los diferentes lugares (supermercados, escuelas, etc.)
    const placesCoordinates = {
        supermercados: [
            [-101.38961224506089, 20.684559931147454],
            [-101.38530428279932, 20.681759992267573],
            [-101.37962306986634, 20.681190674372587], // Ejemplo de coordenadas de un supermercado
        // Agregar más coordenadas de supermercados aquí según sea necesario
        ],
        escuelas: [
            [-101.37320527014634, 20.682717775577956]
        // Coordenadas de las escuelas
        ],
        hospitales: [
        // Coordenadas de las iglesias
        ],
        plazas: [
        // Coordenadas de las plazas
        ],
    };

    const placesData = {
        supermercados: [
            { name: "Supermercado A", address: "Dirección del Supermercado A" },
            { name: "Supermercado B", address: "Dirección del Supermercado B" },
            { name: "Supermercado C", address: "Dirección del Supermercado C" },
            // Puedes agregar más supermercados aquí según sea necesario
        ],
        escuelas: [
            { name: "Escuela A", address: "Dirección de la Escuela A" },
            { name: "Escuela B", address: "Dirección de la Escuela B" },
            { name: "Escuela C", address: "Dirección de la Escuela C" },
            // Puedes agregar más escuelas aquí según sea necesario
        ],
        hospitales: [
            { name: "Hospital A", address: "Dirección de la Hospital A" },
            { name: "Hospital B", address: "Dirección de la Hospital B" },
            { name: "Hospital C", address: "Dirección de la Hospital C" },
            // Puedes agregar más iglesias aquí según sea necesario
        ],
        plazas: [
            { name: "Plaza A", address: "Dirección de la Plaza A" },
            { name: "Plaza B", address: "Dirección de la Plaza B" },
            { name: "Plaza C", address: "Dirección de la Plaza C" },
            // Puedes agregar más plazas aquí según sea necesario
        ],
    };

  return (
        <div className="relative">
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 backdrop-blur-sm p-2">
                <div className="grid grid-cols-4 gap-3 justify-center mt-4">
                    <button className="flex flex-col group items-center" onClick={() => handleFilterClick("supermercados")}>
                        <div className="rounded-full border border-neutral-900 group-hover:bg-neutral-800 group-hover:text-white w-10 h-10 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                        </div>
                        <span className="text-xs group-hover:font-bold">Supermercados</span>
                    </button>
                    <button className="flex flex-col group items-center">
                        <div className="rounded-full border border-neutral-900 group-hover:bg-neutral-800 group-hover:text-white w-10 h-10 flex items-center justify-center" onClick={() => handleFilterClick("escuelas")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-graduation-cap"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>
                        </div>
                        <span className="text-xs group-hover:font-bold">Escuelas</span>
                    </button>
                    <button className="flex flex-col group items-center">
                        <div className="rounded-full border border-neutral-900 group-hover:bg-neutral-800 group-hover:text-white w-10 h-10 flex items-center justify-center" onClick={() => handleFilterClick("hospitales")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-church"><path d="m18 7 4 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9l4-2"/><path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4"/><path d="M18 22V5l-6-3-6 3v17"/><path d="M12 7v5"/><path d="M10 9h4"/></svg>
                        </div>
                        <span className="text-xs group-hover:font-bold">Hospitales</span>
                    </button>
                    <button className="flex flex-col group items-center">
                        <div className="rounded-full border border-neutral-900 group-hover:bg-neutral-800 group-hover:text-white w-10 h-10 flex items-center justify-center" onClick={() => handleFilterClick("plazas")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shrub"><path d="M12 22v-7l-2-2"/><path d="M17 8v.8A6 6 0 0 1 13.8 20v0H10v0A6.5 6.5 0 0 1 7 8h0a5 5 0 0 1 10 0Z"/><path d="m14 14-2 2"/></svg>
                        </div>
                        <span className="text-xs group-hover:font-bold">Plazas</span>
                    </button>
                </div>
                {/* <div className="w-full border border-blue-900 mt-4"></div> */}
                {/* <div className="bg-white rounded-2xl py-1 px-4 mt-4">
                    {filter && (
                        <>
                            {placesData[filter].map((place, index) => (
                                <div key={index}>
                                    <p className="font-bold">{place.name}</p>
                                    <p className="text-xs">{place.address}</p>
                                </div>
                            ))}
                        </>
                    )}
                </div> */}
            </div>
            <div id="map" className="w-auto h-[80vh]" />

        </div>
  )
}
