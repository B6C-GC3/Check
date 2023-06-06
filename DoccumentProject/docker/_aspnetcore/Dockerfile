FROM mcr.microsoft.com/dotnet/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
WORKDIR /src
COPY *.csproj ./
RUN dotnet restore 

COPY . .
WORKDIR "/../../../ApiProject/src/ApiProject.Web.Host"
RUN dotnet build "TestDocker.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TestDocker.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
EXPOSE 80
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TestDocker.dll"]