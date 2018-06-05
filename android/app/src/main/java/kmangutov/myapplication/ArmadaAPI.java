package kmangutov.myapplication;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface ArmadaAPI {
    @GET("order/{orderId}/checkpoint/{checkpointId}")
    Call checkpoint(@Path("orderId") String orderId, @Path("checkpointId") String checkpointId);
}
