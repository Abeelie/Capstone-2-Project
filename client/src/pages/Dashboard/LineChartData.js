const data = {
    labels: ['Monday', 'Tuesday', 'Wensday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
    {
        label: 'Hours spent studying',
        data: [1, 4, 5, 7, 8, 3, 4],
        fill: false,
        backgroundColor: 'rgb(224, 87, 100)',
        borderColor: 'rgba(200, 70, 102, 0.1)',
    },
    ],
};

    const options = {
    scales: {
    yAxes: [
        {
        ticks: {
            beginAtZero: true,
        },
        },
    ],
    },
};


export {data, options}