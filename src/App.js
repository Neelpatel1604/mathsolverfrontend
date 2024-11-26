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
                            className="p-2 text-base rounded border border-gray-300 bg-white cursor-pointer mb-5 min-w-[250px] text-left hover:border-gray-600 focus:outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20"
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
        <div className="flex min-h-screen bg-[#f0f4f8] m-0 p-0 w-full">
            <nav className="w-[250px] bg-indigo-900 text-white py-5 h-screen fixed left-0 top-0">
                <ul className="list-none p-0 m-0">
                    <li 
                        className={`py-4 px-6 cursor-pointer transition-all duration-300 relative text-white/80 hover:bg-indigo-600 hover:text-white hover:pl-8 
                            ${activeComponent === 'basic' ? 'bg-indigo-600 text-white border-l-4 border-white pl-5' : ''}`}
                        onClick={() => setActiveComponent('basic')}
                    >
                        Basic Calculator
                    </li>
                    <li 
                        className={`py-4 px-6 cursor-pointer transition-all duration-300 relative text-white/80 hover:bg-indigo-600 hover:text-white hover:pl-8 
                            ${activeComponent === 'equation' ? 'bg-indigo-600 text-white border-l-4 border-white pl-5' : ''}`}
                        onClick={() => setActiveComponent('equation')}
                    >
                        Equation Solver
                    </li>
                    <li 
                        className={`py-4 px-6 cursor-pointer transition-all duration-300 relative text-white/80 hover:bg-indigo-600 hover:text-white hover:pl-8 
                            ${activeComponent === 'matrix' ? 'bg-indigo-600 text-white border-l-4 border-white pl-5' : ''}`}
                        onClick={() => setActiveComponent('matrix')}
                    >
                        Matrix Solver
                    </li>
                    <li 
                        className={`py-4 px-6 cursor-pointer transition-all duration-300 relative text-white/80 hover:bg-indigo-600 hover:text-white hover:pl-8 
                            ${activeComponent === 'graph' ? 'bg-indigo-600 text-white border-l-4 border-white pl-5' : ''}`}
                        onClick={() => setActiveComponent('graph')}
                    >
                        Graph Plotter
                    </li>
                </ul>
            </nav>
            
            <div className="flex-1 ml-[250px] p-5 w-[calc(100%-250px)] min-h-screen flex flex-col">
                <header className="bg-indigo-900 p-5 text-white rounded-t-lg">
                    <h1 className="m-0 text-4xl text-center">Math Solver</h1>
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