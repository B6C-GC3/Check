using System.Threading.Tasks;
using ApiProject.Configuration.Dto;

namespace ApiProject.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
