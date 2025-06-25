FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY . .
RUN dotnet publish UserReportService/UserReportService.csproj -c Release -o /app/publish


FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 3013
ENTRYPOINT ["dotnet", "UserReportService.dll"]