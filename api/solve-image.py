import os
import sys
import base64
import mimetypes
import json
from openai import OpenAI

def handler(request):
    """
    Vercel Serverless Function handler for image processing
    Based on the provided Python example for extracting and solving math problems
    """
    
    # CORS headers
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }
    
    # Handle preflight request
    if request.method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': ''
        }
    
    if request.method != 'POST':
        return {
            'statusCode': 405,
            'headers': headers,
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        # Get API key from environment variables
        API_KEY = os.environ.get("GROQ_API_KEY") or os.environ.get("OPENAI_API_KEY")
        
        if not API_KEY:
            return {
                'statusCode': 500,
                'headers': headers,
                'body': json.dumps({'error': 'API key not configured'})
            }
        
        # Get the uploaded image from the request
        content_type = request.headers.get('content-type', '')
        
        if 'multipart/form-data' in content_type:
            # Parse multipart form data
            files = request.files
            if 'image' not in files:
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({'error': 'No image file provided'})
                }
            
            image_file = files['image']
            image_data = image_file.read()
            
            # Validate file size (2MB limit)
            if len(image_data) > 2 * 1024 * 1024:
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({'error': 'Image file too large. Maximum size: 2MB'})
                }
            
            # Determine MIME type
            mime = image_file.content_type or 'image/jpeg'
            
        elif 'application/json' in content_type:
            # Handle base64 encoded image in JSON
            body = json.loads(request.body)
            if 'image' not in body:
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({'error': 'No image data provided'})
                }
            
            image_b64 = body['image']
            mime = body.get('mime_type', 'image/jpeg')
            image_data = base64.b64decode(image_b64)
        else:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({'error': 'Invalid content type'})
            }
        
        # Encode image to base64
        image_b64 = base64.b64encode(image_data).decode('utf-8')
        data_uri = f"data:{mime};base64,{image_b64}"
        
        # Initialize Groq client with the exact configuration from the example
        client = OpenAI(
            base_url="https://api.groq.com/openai/v1",
            api_key=API_KEY
        )
        
        # Prepare messages exactly as in the example
        messages = [
            {
                "role": "system",
                "content": (
                    "Eres el mejor profesor de matematicas calculo y calculo multivariado"
                    "Devuelve SOLO un JSON válido con los siguientes campos:\n"
                    "{\n"
                    "  \"extracted_text\": \"texto tal cual extraído\",\n"
                    "  \"extracted_equation\": \"ecuación matemática exacta en LaTeX\",\n"
                    "  \"solution_steps\": [\"paso1\", \"paso2\", ...],\n"
                    "  \"final_answer\": \"resultado final\"\n"
                    "}"
                )
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "Extrae el ejercicio de la imagen y resuélvelo paso a paso. Si es un problema de cálculo multivariable (derivadas parciales, integrales múltiples, gradiente), proporciona pasos detallados."
                    },
                    {
                        "type": "image_url",
                        "image_url": {"url": data_uri}
                    }
                ]
            }
        ]
        
        # Call the model exactly as in the example
        resp = client.chat.completions.create(
            model="meta-llama/llama-4-scout-17b-16e-instruct",
            messages=messages,
            temperature=0,
            response_format={"type": "json_object"}
        )
        
        content = resp.choices[0].message.content
        
        # Parse the JSON response
        try:
            parsed = json.loads(content)
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({
                    'success': True,
                    'data': parsed
                })
            }
        except json.JSONDecodeError as e:
            return {
                'statusCode': 500,
                'headers': headers,
                'body': json.dumps({
                    'error': 'Failed to parse model response',
                    'raw_response': content
                })
            }
            
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({
                'error': str(e),
                'type': type(e).__name__
            })
        }
