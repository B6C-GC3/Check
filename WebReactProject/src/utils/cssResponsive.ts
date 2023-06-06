export class CssResponsive {
    public static readonly colRowLayout = {
        span: 24
    }
    public static readonly colLayout = {
        xxl: 8, //screen ≥ 1600px
        xl: 8, //screen ≥ 1200px
        lg: 12, //screen ≥ 992px
        md: 24, //screen ≥ 768px
        sm: 24, //screen ≥ 576px
        xs: 24 //screen < 576px
    }
    public static readonly formItemLayoutInRow = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 }
    }
    public static readonly formItemLayout = {
        labelCol: { xs: { span: 24 }, sm: { span: 24 }, md: { span: 8 }, lg: { span: 8 }, xl: { span: 8 }, xxl: { span: 8 } },
        wrapperCol: { xs: { span: 24 }, sm: { span: 24 }, md: { span: 16 }, lg: { span: 16 }, xl: { span: 16 }, xxl: { span: 16 } }
    }
    public static readonly tailLayout = {
        wrapperCol: { xs: { span: 24 }, sm: { span: 12, offset: 12 }, md: { span: 12, offset: 8 }, lg: { span: 12, offset: 8 } }
    };

}