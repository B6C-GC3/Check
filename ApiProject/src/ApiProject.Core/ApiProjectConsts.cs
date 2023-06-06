using ApiProject.Debugging;

namespace ApiProject
{
    public class ApiProjectConsts
    {
        public const string LocalizationSourceName = "ApiProject";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "0b5a039d39fa442286e162bce521afe0";
    }
}
