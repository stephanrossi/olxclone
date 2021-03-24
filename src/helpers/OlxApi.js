import Cookies from 'js-cookie';
import qs from 'qs';

const BASEAPI = 'http://alunos.b7web.com.br:501';
// const BASEAPI = 'http://localhost:8000/api';

const apiFetchGet = async (url, body = []) => {
    if (!body.token) {
        let token = Cookies.get.token;
        if (token) {
            body.token = token;
        }
    }

    const res = await fetch(`${BASEAPI + url}?${qs.stringify(body)}`)

    const json = await res.json();

    if (json.notallowed) {
        window.location.href = '/signin';
        return;
    }
    return json;
}

const apiFetchPost = async (url, body) => {
    if (!body.token) {
        let token = Cookies.get.token;
        if (token) {
            body.token = token;
        }
    }

    const res = await fetch(BASEAPI + url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    const json = await res.json();

    if (json.notallowed) {
        window.location.href = '/signin';
        return;
    }
    return json;
}

const OlxApi = {
    login: async (email, password) => {
        const json = await apiFetchPost(
            '/user/signin',
            // '/auth/login',
            { email, password }
        );
        return json;
    },

    register: async (name, email, password, stateLoc) => {
        const json = await apiFetchPost(
            '/user/signup',
            { name, email, password, state: stateLoc }
        );
        return json;
    },

    getStates: async () => {
        const json = await apiFetchGet(
            '/states'
        )
        return json.states;
    },

    getCategories: async () => {
        const json = await apiFetchGet(
            '/categories'
        )
        return json.categories
    },

    getAds: async (options) => {
        const json = await apiFetchGet(
            '/ad/list',
            options
        )
        return json;
    },

    getAd: async (id, other = false) => {
        const json = await apiFetchGet(
            '/ad/item',
            { id, other }
        )
        return json;
    }
}

export default () => OlxApi;