import { createStore } from 'redux';
import { allReducers } from './reducer';

export let store = createStore(allReducers);