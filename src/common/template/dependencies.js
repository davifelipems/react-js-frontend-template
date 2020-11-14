import 'font-awesome/css/font-awesome.min.css'
import 'admin-lte/bootstrap/css/bootstrap.min.css'
import 'admin-lte/dist/css/AdminLTE.min.css'
import 'admin-lte/dist/css/skins/_all-skins.min.css'
import 'admin-lte/plugins/iCheck/flat/blue.css'
import '../../styles/global';

if(!process.env.JEST_WORKER_ID){
    Promise.all([
        import('modules/admin-lte/plugins/jQueryUI/jquery-ui.min'),
        import('modules/admin-lte/plugins/fastclick/fastclick'),
        import('modules/admin-lte/plugins/slimScroll/jquery.slimscroll.min'),
        import('modules/admin-lte/dist/js/app.min')
    ])
    .then(([module1]) => {
        //Does not load these dependencies in a test environment
    });
}
