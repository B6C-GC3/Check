using System;

namespace ApiProject.AttributeCustomCore
{
    [AttributeUsage(AttributeTargets.All|AttributeTargets.Class | AttributeTargets.Interface, AllowMultiple = false)]
    public class TransactionAttribute : Attribute
    {
    }
}
