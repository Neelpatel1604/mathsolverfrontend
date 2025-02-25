import React, { useState, useEffect } from 'react';
import BasicCalculator from './components/BasicCalculator';
import QuadraticSolver from './components/QuadraticSolver';
import SystemSolver from './components/SystemSolver';
import PolynomialSolver from './components/PolynomialSolver';
import MatrixSolver from './components/MatrixSolver';
import ExpressionInput from './components/ExpressionInput';
import '../src/CSS/App.css';
import { Tooltip } from 'react-tooltip';

// Main App component
function App() {
    const [isDark, setIsDark] = useState(false);
    const [activeComponent, setActiveComponent] = useState('basic');
    const [equationSolver, setEquationSolver] = useState('quadratic');
    const [isNavOpen, setIsNavOpen] = useState(false); // State for mobile nav
    const [isLoading, setIsLoading] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        // Simulate initial loading
        setTimeout(() => setIsLoading(false), 1000);
    }, []);

    const toggleTheme = () => {
        setIsDark(prev => !prev);
        // Toggle the 'dark' class on the html element for Tailwind
        document.documentElement.classList.toggle('dark');
    };

    const equationTypes = [
        { value: 'quadratic', label: 'Quadratic Solver' },
        { value: 'system', label: 'System of Equations Solver' },
        { value: 'polynomial', label: 'Polynomial Equation Solver' }
    ];

    const renderEquationSolver = () => {
        switch(equationSolver) {
            case 'quadratic':
                return <QuadraticSolver isDark={isDark} />;
            case 'system':
                return <SystemSolver isDark={isDark} />;
            case 'polynomial':
                return <PolynomialSolver isDark={isDark} />;
            default:
                return <QuadraticSolver isDark={isDark} />;
        }
    };
  
    const renderComponent = () => {
        switch(activeComponent) {
            case 'basic':
                return <BasicCalculator isDark={isDark} />;
            case 'matrix':
                return <MatrixSolver isDark={isDark} />;
            case 'graph':
                return <ExpressionInput isDark={isDark} />;
            case 'equation':
                return (
                    <div className="flex flex-col items-center w-full p-5">
                        <div className="relative w-full max-w-[250px] mb-5">
                            <button 
                                type="button"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className={`w-full p-3 border-2 ${
                                    isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-200 bg-white'
                                } rounded-lg text-base flex justify-between items-center cursor-pointer focus:outline-none 
                                focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10`}
                            >
                                <span>{equationTypes.find(eq => eq.value === equationSolver)?.label}</span>
                                <svg 
                                    className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {isDropdownOpen && (
                                <div className={`absolute top-full left-0 w-full mt-1 border-2 ${
                                    isDark 
                                        ? 'bg-gray-700 border-gray-600 text-white' 
                                        : 'bg-white border-gray-200'
                                } rounded-lg shadow-lg z-10`}>
                                    {equationTypes.map((type) => (
                                        <button
                                            key={type.value}
                                            type="button"
                                            onClick={() => {
                                                setEquationSolver(type.value);
                                                setIsDropdownOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2 hover:bg-indigo-600 hover:text-white
                                                ${equationSolver === type.value 
                                                    ? 'bg-indigo-600 text-white' 
                                                    : isDark ? 'text-gray-200' : 'text-gray-700'
                                                } transition-colors first:rounded-t-lg last:rounded-b-lg`}
                                        >
                                            {type.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        {renderEquationSolver()}
                    </div>
                );
            default:
                return <BasicCalculator isDark={isDark} />;
        }
    };

    const getPageTitle = () => {
        switch(activeComponent) {
            case 'basic': return 'Basic Calculator';
            case 'matrix': return 'Matrix Solver';
            case 'graph': return 'Graph Plotter';
            case 'equation': return `Equation Solver - ${equationSolver.charAt(0).toUpperCase() + equationSolver.slice(1)}`;
            default: return 'Math Solver';
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#f0f4f8]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-900"></div>
            </div>
        );
    }

    return (
        <div className={`flex min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-[#f0f4f8]'}`}>
            {/* Mobile Navigation Overlay */}
            <div 
                onClick={() => setIsNavOpen(false)}
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden
                    ${isNavOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            />

            {/* Side Navigation */}
            <nav className={`fixed left-0 top-0 h-full w-[280px] ${isDark ? 'bg-gray-800' : 'bg-indigo-900'} 
                text-white py-5 transition-transform duration-300 ease-in-out z-50
                ${isNavOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
            >
                <div className="px-6 mb-8 mt-10 flex items-center justify-between">
                    <h2 className="text-xl font-bold">Math Solver</h2>
                    <button 
                        onClick={toggleTheme}
                        className="p-2  rounded-full hover:bg-indigo-700"
                    >
                        {isDark ? '🌞' : '🌙'}
                    </button>
                </div>

                {/* Close button for mobile */}
                <button 
                    onClick={() => setIsNavOpen(false)}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-indigo-700 md:hidden"
                >
                    <svg 
                        className="w-6 h-6" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <ul className="list-none p-0 m-0">
                    {[
                        { id: 'basic', label: 'Basic Calculator', icon: '🔢' },
                        { id: 'equation', label: 'Equation Solver', icon: '📐' },
                        { id: 'matrix', label: 'Matrix Solver', icon: '📊' },
                        { id: 'graph', label: 'Graph Plotter', icon: '📈' }
                    ].map(item => (
                        <li 
                            key={item.id}
                            data-tooltip-id={`tooltip-${item.id}`}
                            className={`py-4 px-6 cursor-pointer transition-all duration-300 relative text-white/80 
                                hover:bg-indigo-600 hover:text-white hover:pl-8 
                                ${activeComponent === item.id ? `${isDark ? 'bg-gray-700' : 'bg-indigo-600'} text-white border-l-4 border-white pl-5` : ''}`}
                            onClick={() => { 
                                setActiveComponent(item.id); 
                                setIsNavOpen(false); 
                            }}
                        >
                            <span className="mr-3">{item.icon}</span>
                            {item.label}
                        </li>
                    ))}
                </ul>
            </nav>
            
            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen md:pl-[280px]">
                <div className="container mx-auto px-4 pt-6">
                    <header className={`${isDark ? 'bg-gray-800' : 'bg-indigo-900'} p-4 text-white rounded-lg`}>
                        <div className="flex items-center justify-between mb-4">
                            <button 
                                onClick={() => setIsNavOpen(true)} 
                                className="p-2 rounded-lg hover:bg-indigo-700 md:hidden"
                            >
                                <svg 
                                    className="w-6 h-6" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            <h1 className="text-2xl md:text-4xl font-bold text-center flex-grow">Math Solver</h1>
                            <div className="w-8 md:hidden">
                                {/* Empty div for flex spacing */}
                            </div>
                        </div>
                        <div className="text-sm text-gray-300 text-center">
                            Home / {getPageTitle()}
                        </div>
                    </header>
                    <main className={`flex-1 p-6 ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md my-4 transition-colors duration-300`}>
                        {renderComponent()}
                    </main>
                    <footer className={`w-full p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} text-center text-sm`}>
                        <p>© 2025 Math Solver. All rights reserved.</p>
                    </footer>
                </div>
            </div>
            
            <Tooltip id="tooltip-basic" content="Perform basic mathematical calculations" />
            <Tooltip id="tooltip-equation" content="Solve various types of equations" />
            <Tooltip id="tooltip-matrix" content="Perform matrix operations and solve systems" />
            <Tooltip id="tooltip-graph" content="Plot and analyze mathematical functions" />
        </div>
    );
}

export default App;