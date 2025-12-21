import { useEffect } from 'react';

const BASE_TITLE = 'Son en Tránsito | Silvino Díaz Carreras';

const pageTitles: Record<string, string> = {
    '/': BASE_TITLE,
    '/about': 'Sobre Mí | ' + BASE_TITLE,
    '/research': 'Investigación | ' + BASE_TITLE,
    '/sounds': 'Sonidos | ' + BASE_TITLE,
    '/gallery': 'Galería | ' + BASE_TITLE,
    '/map': 'Mapa de Análisis | ' + BASE_TITLE,
};

export const usePageTitle = (pathname: string) => {
    useEffect(() => {
        document.title = pageTitles[pathname] || BASE_TITLE;
    }, [pathname]);
};

export default usePageTitle;
