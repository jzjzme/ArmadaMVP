package kmangutov.myapplication;

import android.content.Intent;
import android.net.Uri;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.ArrayAdapter;
import android.widget.Spinner;

import com.google.zxing.Result;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import me.dm7.barcodescanner.zxing.ZXingScannerView;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MainActivity extends AppCompatActivity implements ZXingScannerView.ResultHandler {
    private static final String TAG = "ssa";
    private static final String DOMAIN = "http://206.189.90.181:3000";

    private ZXingScannerView scannerView;
    private Spinner spinner;

    private ArmadaAPI armadaAPI;

    @Override
    public void onCreate(Bundle state) {
        super.onCreate(state);

        setContentView(R.layout.activity_main);
        scannerView = findViewById(R.id.scanner);
        spinner = findViewById(R.id.spinner);

        List<String> list = new ArrayList<String>();
        list.add("0");
        list.add("1");
        list.add("2");
        list.add("3");
        ArrayAdapter<String> adapter = new ArrayAdapter<String>(this,
                android.R.layout.simple_spinner_item, list);

        spinner.setAdapter(adapter);

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(DOMAIN)
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        armadaAPI = retrofit.create(ArmadaAPI.class);
    }

    @Override
    public void onResume() {
        super.onResume();
        scannerView.setResultHandler(this);
        scannerView.startCamera();
    }

    @Override
    public void onPause() {
        super.onPause();
        scannerView.stopCamera();
    }

    @Override
    public void handleResult(Result rawResult) {
        Log.v(TAG, rawResult.getText());
        Log.v(TAG, rawResult.getBarcodeFormat().toString());

        scannerView.resumeCameraPreview(this);

        String productId = rawResult.getText();
        String checkpointId = spinner.getSelectedItem().toString();

        Call call = armadaAPI.checkpoint(productId, checkpointId);
        call.enqueue(new Callback() {
            @Override
            public void onResponse(Call call, Response response) {
                Log.v(TAG, "response:" + response.body());
            }

            @Override
            public void onFailure(Call call, Throwable t) {
                t.printStackTrace();
            }
        });

        //startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse("http://www.stackoverflow.com")));
    }
}