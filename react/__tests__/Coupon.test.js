import expect from 'expect';
import { render } from '@vtex/test-tools/react';
import React from 'react'

describe('empty', () =>{

    it('should return true', () => {
        expect(true).toEqual(true)
    })

    it('should be a div', () =>{
        const componente = render(<div>Hello</div>)
        expect(componente).toBeDefined()
    })
})
