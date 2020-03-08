// import axios from 'axios';
// import { call, delay, put, take } from 'redux-saga/effects';
// import SessionAction from '../actions/session';
// import '../../services/_DATA';

// export function fetchData(id)
// {
//     return axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
// }

// /**
//  * Initialize data from API.
//  */
// function* initializeData()
// {
//     while (true)
//     {
//         try
//         {
//             const { payload } = yield take(AppAction.Types.FETCH);
//             yield delay(2000);
//             const response = yield call(fetchData, payload.id);
//             yield put(AppAction.Action(AppAction.Types.UPDATE, response.data));
//             yield put(AppAction.Action(AppAction.Types.REMOVE, 'error'));
//         }
//         catch (e)
//         {
//             yield put(AppAction.Action(AppAction.Types.UPDATE, { error: e.message }));
//         }
//     }
// }

// export default initializeData;
