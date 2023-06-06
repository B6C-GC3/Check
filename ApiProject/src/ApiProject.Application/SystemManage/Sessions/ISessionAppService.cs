using System.Threading.Tasks;
using Abp.Application.Services;
using ApiProject.Sessions.Dto;

namespace ApiProject.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
