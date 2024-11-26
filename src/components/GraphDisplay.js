import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Zoom
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    zoomPlugin
);

const GraphDisplay = ({ expressionData }) => {
    if (!expressionData || !expressionData.points) {
        return null;
    }

    const data = {
        datasets: [{
            label: expressionData.expression || 'Function',
            data: expressionData.points.map(point => ({x: point.x, y: point.y})),
            borderColor: '#4F46E5',
            backgroundColor: 'rgba(79, 70, 229, 0.1)',
            pointRadius: 0,
            borderWidth: 2,
            tension: 0.1
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
            }
        },
        scales: {
            x: {
                type: 'linear',
                position: 'center',
                grid: {
                    display: true,
                    color: '#e5e7eb',
                    drawBorder: false,
                    lineWidth: 1
                },
                border: {
                    display: true,
                    color: '#4b5563',
                    width: 1
                },
                ticks: {
                    stepSize: 1,
                    font: {
                        size: 12
                    },
                    color: '#4b5563',
                    padding: 5
                },
                min: -10,
                max: 10
            },
            y: {
                type: 'linear',
                position: 'center',
                grid: {
                    display: true,
                    color: '#e5e7eb',
                    drawBorder: false,
                    lineWidth: 1
                },
                border: {
                    display: true,
                    color: '#4b5563',
                    width: 1
                },
                ticks: {
                    stepSize: 1,
                    font: {
                        size: 12
                    },
                    color: '#4b5563',
                    padding: 5
                },
                min: -10,
                max: 10
            }
        },
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: `y = ${expressionData.expression}`,
                font: {
                    size: 16,
                    weight: 'normal'
                },
                padding: {
                    top: 10,
                    bottom: 20
                },
                color: '#1f2937'
            },
            tooltip: {
                enabled: false
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'xy'
                },
                zoom: {
                    wheel: {
                        enabled: true,
                        speed: 0.1
                    },
                    pinch: {
                        enabled: true
                    },
                    mode: 'xy',
                    onZoom: function(context) {
                        const chart = context.chart;
                        const xAxis = chart.scales.x;
                        const yAxis = chart.scales.y;
                        
                        const xRange = Math.abs(xAxis.max - xAxis.min);
                        const range = Math.max(xRange, Math.abs(yAxis.max - yAxis.min));
                        const center = 0;
                        
                        xAxis.options.min = center - range/2;
                        xAxis.options.max = center + range/2;
                        yAxis.options.min = center - range/2;
                        yAxis.options.max = center + range/2;
                        
                        const stepSize = Math.max(0.2, Math.pow(10, Math.floor(Math.log10(range/10))));
                        xAxis.options.ticks.stepSize = stepSize;
                        yAxis.options.ticks.stepSize = stepSize;
                        
                        chart.update('none');
                    }
                },
                limits: {
                    x: {min: -50, max: 50, minRange: 1},
                    y: {min: -50, max: 50, minRange: 1}
                }
            }
        },
        animation: false
    };

    return (
        <div className="w-full max-w-[900px] h-[600px] mx-auto my-8 p-6 bg-white rounded-xl shadow-lg 
                      md:max-w-[700px] md:h-[500px] sm:max-w-[450px] sm:h-[400px]">
            <Line data={data} options={options} className="bg-white" />
        </div>
    );
};

export default GraphDisplay; 