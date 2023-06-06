using log4net;
using log4net.Config;
using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Text;
using System.Xml;

namespace Utils.WriteLogExtention.Application
{
    public interface ILog4NetManager
    {
        void LogInformation(string message);
        void LogWanning(string message);
        void LogError(string message, Exception exception);
    }

    public class Log4NetManager : ILog4NetManager
    {
        private readonly ILog _logger = LogManager.GetLogger(typeof(Log4NetManager));

        private static Log4NetManager _log4NetManager;

        public Log4NetManager()
        {
            try
            {
                XmlDocument log4netConfig = new XmlDocument();

                using (var fs = File.OpenRead(@"..\Utils\WriteLogExtention\log4net.config"))
                {
                    log4netConfig.Load(fs);

                    var repo = LogManager.CreateRepository(
                            Assembly.GetEntryAssembly(),
                            typeof(log4net.Repository.Hierarchy.Hierarchy));

                    XmlConfigurator.Configure(repo, log4netConfig["log4net"]);

                    // The first log to be written
                    _logger.Info("Log System Initialized");
                }
            }
            catch (Exception ex)
            {
                _logger.Error("Error", ex);
            }
        }

        public static Log4NetManager Initialization()
        {
            if (_log4NetManager == null)
            {
                _log4NetManager = new Log4NetManager();
            }

            return _log4NetManager;
        }

        public void LogError(string message, Exception exception)
        {
            _logger.Error(message, exception);
        }

        // Logging functionality happens here
        public void LogInformation(string message)
        {
            _logger.Info(message);
        }

        public void LogWanning(string message)
        {
            _logger.Info(message);
        }
    }
}
