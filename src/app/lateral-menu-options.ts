export default [
    {
        icon: 'icon-mi-negocio-black',
        title: 'Mi empresa',
        link: '/my-company'
    },
    {
        dropdown: [
            {
                link: '/my-balance/income',
                text: 'Ingresos'
            },
            {
                link: '/my-balance/expenses',
                text: 'Gastos'
            },
            {
                link: '/my-balance/profit',
                text: 'Beneficios'
            }
        ],
        icon: 'icon-mis-numeros-black',
        title: 'Mis números'
    },
    {
        dropdown: [
            {
                link: '/my-team/social-insurance',
                text: 'Seguros sociales'
            },
            {
                link: '/my-team',
                text: 'Costes'
            },
            {
                link: '/my-team',
                text: 'Formación'
            },
            {
                link: '/my-team/abseenteism',
                text: 'Absentismo'
            }
        ],
        icon: 'icon-mi-equipo-black',
        title: 'Mi equipo'
    },
    {
        icon: 'icon-mis-impuestos-black',
        title: 'Mis impuestos',
        link: '/my-taxes'
    },
    {
        icon: 'icon-mis-objetivos-black',
        title: 'Mis objetivos',
        link: '/my-goals'
    },
    {
        icon: 'icon-mi-calendario-black',
        title: 'Mi calendario',
        link: '/my-calendar'
    }
]