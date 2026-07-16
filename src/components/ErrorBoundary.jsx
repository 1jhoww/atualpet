import { Component } from 'react'
export default class ErrorBoundary extends Component { state={failed:false}; static getDerivedStateFromError(){return{failed:true}}; render(){return this.state.failed?<main className="error-boundary"><h1>Algo não saiu como esperado.</h1><p>Recarregue a página ou volte ao início.</p><a className="button" href="/">Voltar ao início</a></main>:this.props.children} }
