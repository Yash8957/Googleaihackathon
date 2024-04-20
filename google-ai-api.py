
from google.cloud import aiplatform
import base64

# Initialize the client
client_options = {"project": "YOUR_PROJECT_ID", "location": "YOUR_LOCATION"}
client = aiplatform.gapic.PredictionServiceClient(client_options=client_options)

def predict_image_caption(image_path):
    with open(image_path, "rb") as f:
        file_content = f.read()

    encoded_content = base64.b64encode(file_content).decode("utf-8")
    instance = aiplatform.gapic.schema.predict.instance.ImageClassificationPredictionInstance(
        content=encoded_content,
    ).to_value()
    instances = [instance]

    parameters = aiplatform.gapic.schema.predict.params.ImageClassificationPredictionParams(
        confidence_threshold=0.5,
        max_predictions=5,
    ).to_value()

    endpoint = client.endpoint_path(
        project="YOUR_PROJECT_ID",
        location="YOUR_LOCATION",
        endpoint="YOUR_ENDPOINT_ID"
    )

    response = client.predict(
        endpoint=endpoint,
        instances=instances,
        parameters=parameters
    )

    for prediction in response.predictions:
        print("Prediction:", dict(prediction))

predict_image_caption('path_to_your_image.jpg')
```

Remember to replace `'YOUR_PROJECT_ID'`, `'YOUR_LOCATION'`, and `'YOUR_ENDPOINT_ID'` with your actual project details. Make sure you have the necessary libraries installed and proper authentication set up. This code sends the image to the AI Platform Prediction API and prints out the predicted captions.
