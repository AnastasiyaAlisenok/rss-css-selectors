import MainPage from './MainPage/MainPage';
import ViewTable from './containers/MainBlock/table/table';

const mainPage = new MainPage();
mainPage.createView();

window.addEventListener('resize', ViewTable.changeTableSize);
