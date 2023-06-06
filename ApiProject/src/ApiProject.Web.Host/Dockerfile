#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["src/ApiProject.Web.Host/ApiProject.Web.Host.csproj", "src/ApiProject.Web.Host/"]
COPY ["src/ApiProject.Web.Core/ApiProject.Web.Core.csproj", "src/ApiProject.Web.Core/"]
COPY ["src/ApiProject.Application/ApiProject.Application.csproj", "src/ApiProject.Application/"]
COPY ["src/ApiProject.Core/ApiProject.Core.csproj", "src/ApiProject.Core/"]
COPY ["src/Utils/Utils.csproj", "src/Utils/"]
COPY ["src/ApiProject.EntityFrameworkCore/ApiProject.EntityFrameworkCore.csproj", "src/ApiProject.EntityFrameworkCore/"]
COPY ["src/UnitOfWork/UnitOfWork.csproj", "src/UnitOfWork/"]
RUN dotnet restore "src/ApiProject.Web.Host/ApiProject.Web.Host.csproj"
COPY . .
WORKDIR "/src/ApiProject.Web.Host"
RUN dotnet build "ApiProject.Web.Host.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ApiProject.Web.Host.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ApiProject.Web.Host.dll"]