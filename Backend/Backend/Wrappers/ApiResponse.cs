namespace API.Wrappers
{
    public class ApiResponse<T>
    {
        public string Message { get; set; }
        public T? Data { get; set; }
        public List<string>? Errors { get; set; }

        public ApiResponse(T data, string message)
        {
            Message = message;
            Data = data;
        }

        public ApiResponse(List<string> errors, string message)
        {
            Message = message;
            Errors = errors;
        }

        public static ApiResponse<T> SuccessResponse(T data, string message)
        {
            return new ApiResponse<T>(data, message);
        }

        public static ApiResponse<T> FailedResponse(List<string> errors, string message = "An error has occurred")
        {
            return new ApiResponse<T>(errors, message);
        }
    }
}
