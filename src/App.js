import React, { useState } from 'react';
import BasicCalculator from './components/BasicCalculator';
import QuadraticSolver from './components/QuadraticSolver';
import SystemSolver from './components/SystemSolver';
import PolynomialSolver from './components/PolynomialSolver';
import MatrixSolver from './components/MatrixSolver';
import ExpressionInput from './components/ExpressionInput';
import '../src/CSS/App.css';

// Main App component
function App() {
    const [activeComponent, setActiveComponent] = useState('basic');
    const [equationSolver, setEquationSolver] = useState('quadratic');
    const [isNavOpen, setIsNavOpen] = useState(false); // State for mobile nav

    const renderEquationSolver = () => {
        switch(equationSolver) {
            case 'quadratic':
                return <QuadraticSolver />;
            case 'system':
                return <SystemSolver />;
            case 'polynomial':
                return <PolynomialSolver />;
            default:
                return <QuadraticSolver />;
        }
    };
  
    const renderComponent = () => {
        switch(activeComponent) {
            case 'basic':
                return <BasicCalculator />;
            case 'matrix':
                return <MatrixSolver />;
            case 'graph':
                return <ExpressionInput />;
            case 'equation':
                return (
                    <div className="flex flex-col items-center w-full p-5">
                        <select 
                            value={equationSolver} 
                            onChange={(e) => setEquationSolver(e.target.value)}
                            className="p-2 text-base rounded border border-gray-300
                                        bg-white cursor-pointer mb-5 min-w-[250px] 
                                        text-left focus:outline-none focus:ring-1 focus:ring-indigo-900/20"
                        >
                            <option value="quadratic">Quadratic Solver</option>
                            <option value="system">System of Equations Solver</option>
                            <option value="polynomial">Polynomial Equation Solver</option>
                        </select>
                        {renderEquationSolver()}
                    </div>
                );
            default:
                return <BasicCalculator />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#f0f4f8] m-0 p-0 w-full">
            <nav className={`fixed left-0 top-0 h-full w-[160px] md:w-[250px] bg-indigo-900 text-white py-5 transition-transform duration-300 ${isNavOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <ul className="list-none p-0 m-0">
                    <li className={`py-4 px-6 cursor-pointer transition-all duration-300 relative text-white/80 hover:bg-indigo-600 hover:text-white hover:pl-8 
                        ${activeComponent === 'basic' ? 'bg-indigo-600 text-white border-l-4 border-white pl-5' : ''}`}
                        onClick={() => { setActiveComponent('basic'); setIsNavOpen(false); }}
                    >
                        Basic Calculator
                    </li>
                    <li className={`py-4 px-6 cursor-pointer transition-all duration-300 relative text-white/80 hover:bg-indigo-600 hover:text-white hover:pl-8 
                        ${activeComponent === 'equation' ? 'bg-indigo-600 text-white border-l-4 border-white pl-5' : ''}`}
                        onClick={() => { setActiveComponent('equation'); setIsNavOpen(false); }}
                    >
                        Equation Solver
                    </li>
                    <li className={`py-4 px-6 cursor-pointer transition-all duration-300 relative text-white/80 hover:bg-indigo-600 hover:text-white hover:pl-8 
                        ${activeComponent === 'matrix' ? 'bg-indigo-600 text-white border-l-4 border-white pl-5' : ''}`}
                        onClick={() => { setActiveComponent('matrix'); setIsNavOpen(false); }}
                    >
                        Matrix Solver
                    </li>
                    <li className={`py-4 px-6 cursor-pointer transition-all duration-300 relative text-white/80 hover:bg-indigo-600 hover:text-white hover:pl-8 
                        ${activeComponent === 'graph' ? 'bg-indigo-600 text-white border-l-4 border-white pl-5' : ''}`}
                        onClick={() => { setActiveComponent('graph'); setIsNavOpen(false); }}
                    >
                        Graph Plotter
                    </li>
                </ul>
            </nav>
            
            <div className="flex-1 p-5 w-full min-h-screen flex flex-col md:ml-[250px]">
            <header className="bg-indigo-900 p-5 text-white rounded-t-lg flex justify-between items-center">
                    <div className="flex-grow text-center">
                        <h1 className="m-2 text-4xl">Math Solver</h1>
                    </div>
                    <button onClick={() => setIsNavOpen(!isNavOpen)} className="md:hidden text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </header>
                <main className="flex-1 p-5 bg-white rounded-b-lg shadow-md mb-5">
                    {renderComponent()}
                </main>
                <footer className="w-full p-5 border-t border-gray-200 text-center text-sm">
                    <p>All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}

export default App;