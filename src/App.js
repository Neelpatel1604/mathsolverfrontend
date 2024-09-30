import React, { useState } from 'react';
import BasicCalculator from './components/BasicCalculator';
import QuadraticSolver from './components/QuadraticSolver';
import SystemSolver from './components/SystemSolver';
import PolynomialSolver from './components/PolynomialSolver';
import MatrixSolver from './components/MatrixSolver';
import './App.css';

// Main App component
function App() {
    const [activeComponent, setActiveComponent] = useState('basic');
    const [equationSolver, setEquationSolver] = useState('quadratic');

    const renderComponent = () => {
        if (activeComponent === 'basic') {
            return <BasicCalculator />;
        } else if (activeComponent === 'matrix') {
            return <MatrixSolver />;
        } else if (activeComponent === 'equation') {
            if (equationSolver === 'quadratic') {
                return <QuadraticSolver />;
            } else if (equationSolver === 'system') {
                return <SystemSolver />;
            } else if (equationSolver === 'polynomial') {
                return <PolynomialSolver />;
            }   
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Math Solver</h1>
            </header>
            <nav className="App-nav">
                <select onChange={(e) => setActiveComponent(e.target.value)} value={activeComponent}>
                    <option value="basic">Basic Calculator</option>
                    <option value="equation">Equation Solver</option>
                    <option value="matrix">Matrix Solver</option>
                </select>
                {activeComponent === 'equation' && (
                    <select onChange={(e) => setEquationSolver(e.target.value)} value={equationSolver}>
                        <option value="quadratic">Quadratic Solver</option>
                        <option value="system">System of Equations Solver</option>
                        <option value="polynomial">Polynomial Equation Solver</option>
                    </select>
                )}
            </nav>
            <main className="App-main">
                {renderComponent()}
            </main>
            <footer className="App-footer">
                <p>All rights reserved.</p>
            </footer>
        </div>
    );
}

export default App;