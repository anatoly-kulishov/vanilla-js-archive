import http from 'k6/http';
import { group } from 'k6';

export let options = {
    stages: [
        { duration: '10m', target: 1000 },
    ],
};

export default function () {
    group('API 1', () => {
        const response = http.get('https://lounge-club.site/');
        console.log('1:', response.status)
    });
    group('API 2', () => {
        const response = http.get('https://cinema-park.me/?a=mskchill');
        console.log('2:', response.status)
    });
    group('API 3', () => {
        const response = http.get('https://cinema-radiant.site/?a=c3048e8');
        console.log('3:', response.status)
    });
}
